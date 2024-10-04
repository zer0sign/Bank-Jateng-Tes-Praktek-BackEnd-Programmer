// router.js
import bcrypt from 'bcrypt';
import db from './fileStorage.js';

/**
 * Fungsi untuk mendaftar pengguna
 */
export const registerUser = async (request, h) => {
  const { name, phonenumber, password } = request.payload; // Ambil data dari payload
  try {
    console.log("Input data:", { name, phonenumber, password });

    if (!password) {
      return h.response({ status: 'error', message: "Password is required." }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = 'INSERT INTO users (name, phonenumber, password) VALUES (?, ?, ?)';
    await db.query(insertUserQuery, [name, phonenumber, hashedPassword]);

    console.log('User registered successfully.');
    return h.response({ status: 'success', message: 'User registered successfully.' }).code(201); // Mengembalikan status 201
  } catch (error) {
    console.error('Error registering user:', error);
    return h.response({ status: 'error', message: error.message }).code(500);
  }
};

/**
 * Fungsi untuk login pengguna
 */
export const loginUser = async (request, h) => {
  const { phonenumber, password } = request.payload; // Ambil data dari payload
  try {
    const [users] = await db.query('SELECT * FROM users WHERE phonenumber = ?', [phonenumber]);
    console.log('Users fetched:', users);

    if (users.length === 0) {
      console.log('User not found');
      return h.response({ status: 'error', message: 'User not found.' }).code(404);
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password');
      return h.response({ status: 'error', message: 'Invalid password.' }).code(401);
    }

    console.log('Login successful');
    return h.response({
      status: 'success',
      message: 'Login successful.',
      user: { id: user.id, name: user.name, phonenumber: user.phonenumber }
    }).code(200);
  } catch (error) {
    console.error('Error logging in user:', error);
    return h.response({ status: 'error', message: 'Internal server error.' }).code(500);
  }

};

/**
 * Fungsi untuk Logout
 */
export const logoutUser = async (request, h) => {
  const { phonenumber } = request.payload; // Ambil data dari payload
  try {
    const [users] = await db.query('SELECT * FROM users WHERE phonenumber = ?', [phonenumber]);
    console.log('Users fetched:', users);

    if (users.length === 0) {
      console.log('User not found');
      return h.response({ status: 'error', message: 'User not found.' }).code(404);
    }


    console.log('Logout successful');
    return h.response({
      status: 'success',
      message: 'Logout Success.',
    }).code(200);
  } catch (error) {
    console.error('Error logging in user:', error);
    return h.response({ status: 'error', message: 'Internal server error.' }).code(500);
  }
};


/**
 * Fungsi untuk mendaftar Card
 */
export const AddCard = async (request, h) => {
  const { cardNumber, cardHolder, expired,securityCode } = request.payload; // Ambil data dari payload
  try {
    console.log("Input data:", { cardNumber, cardHolder, expired,securityCode });

    if (!cardNumber || !cardHolder || !expired || !securityCode) {
      return h.response({ status: 'error', message: "Ada Kolom Yang Kosongg." }).code(400);
    }

    const insertUserQuery = 'INSERT INTO cards (cardNumber, cardHolder, expired,securityCode) VALUES (?, ?, ?, ?)';
    await db.query(insertUserQuery, [cardNumber, cardHolder, expired,securityCode]);

    console.log('Card registered successfully.');
    return h.response({ status: 'success', message: 'Card registered successfully.' }).code(201); // Mengembalikan status 201
  } catch (error) {
    console.error('Error registering Card:', error);
    return h.response({ status: 'error', message: error.message }).code(500);
  }
};


/**
 * Fungsi untuk Menampilkan Semua Card
 */
export const getAllCards = async (request, h) => {
  try {
    // Query to fetch all cards
    const [cards] = await db.query('SELECT * FROM cards');

    console.log('Cards fetched successfully:', cards);
    return h.response({ status: 'success', data: cards }).code(200); // Mengembalikan status 200
  } catch (error) {
    console.error('Error fetching cards:', error);
    return h.response({ status: 'error', message: error.message }).code(500);
  }
};


/**
 * Fungsi untuk Menampilkan Card By Id
 */
export const getCardById = async (request, h) => {
  const { id } = request.params; // Ambil ID dari parameter URL
  try {
    // Query untuk mengambil kartu berdasarkan ID
    const [cards] = await db.query('SELECT * FROM cards WHERE id = ?', [id]);

    // Periksa apakah kartu ditemukan
    if (cards.length === 0) {
      return h.response({ status: 'error', message: 'Card not found.' }).code(404); // Mengembalikan status 404 jika tidak ditemukan
    }

    console.log('Card fetched successfully:', cards[0]);
    return h.response({ status: 'success', data: cards[0] }).code(200); // Mengembalikan status 200 dengan data kartu
  } catch (error) {
    console.error('Error fetching card:', error);
    return h.response({ status: 'error', message: error.message }).code(500);
  }
};

/**
 * Fungsi untuk Delete Card By Id
 */
export const deleteCardById = async (request, h) => {
  const { id } = request.params; // Ambil ID dari parameter URL
  try {
    // Query untuk menghapus kartu berdasarkan ID
    const deleteCardQuery = 'DELETE FROM cards WHERE id = ?';
    const [result] = await db.query(deleteCardQuery, [id]);

    // Periksa apakah kartu ditemukan dan dihapus
    if (result.affectedRows === 0) {
      return h.response({ status: 'error', message: 'Card not found.' }).code(404); // Mengembalikan status 404 jika tidak ditemukan
    }

    console.log('Card deleted successfully:', id);
    return h.response({ status: 'success', message: 'Card deleted successfully.' }).code(200); // Mengembalikan status 200
  } catch (error) {
    console.error('Error deleting card:', error);
    return h.response({ status: 'error', message: error.message }).code(500);
  }
};


/**
 * Fungsi untuk Set Card PIN By Id
 */
export const setPin = async (request, h) => {
  const { id } = request.params; // Ambil ID dari parameter URL
  const { pin } = request.payload; // Ambil pin baru dari payload request

  try {
    // Query untuk memperbarui pin berdasarkan ID
    const [result] = await db.query('UPDATE cards SET pin = ? WHERE id = ?', [pin, id]);

    // Periksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return h.response({ status: 'error', message: 'Card not found or PIN not updated.' }).code(404);
    }

    console.log('PIN updated successfully for card ID:', id);
    return h.response({ status: 'success', message: 'PIN updated successfully.' }).code(200);
  } catch (error) {
    console.error('Error updating PIN:', error);
    return h.response({ status: 'error', message: error.message }).code(500);
  }
};


/**
 * Fungsi untuk Post Inquiry
 */
export const inquiryTransaction = async (request, h) => {
  const { from, to, fullname, amount, phonenumber } = request.payload; // Ambil data dari payload
  try {
    console.log("Input data:", { from, to, fullname, amount, phonenumber });

    // Validasi input
    if (!from || !to || !fullname || !amount || !phonenumber) {
      return h.response({ status: 'error', message: "All fields are required." }).code(400);
    }

    // Query untuk menyimpan data transaksi ke dalam tabel inquiry
    const insertInquiryQuery = 'INSERT INTO inquiry (`from`, `to`, fullname, amount, phonenumber) VALUES (?, ?, ?, ?, ?)';
    await db.query(insertInquiryQuery, [from, to, fullname, amount, phonenumber]);

    console.log('Transaction registered successfully.');
    return h.response({ status: 'success', message: 'Transaction registered successfully.' }).code(201); // Mengembalikan status 201
  } catch (error) {
    console.error('Error registering transaction:', error);
    return h.response({ status: 'error', message: error.message }).code(500);
  }
};
