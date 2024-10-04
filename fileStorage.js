// fileStorage.js
import mysql from 'mysql2/promise';

// Buat koneksi MySQL
const db = mysql.createPool({
  host: 'localhost',   // ganti dengan host MySQL kamu
  user: 'root',        // ganti dengan username MySQL kamu
  port: '3307',        // ganti dengan port MySQL kamu
  password: '',        // ganti dengan password MySQL kamu
  database: 'bankjateng'  // ganti dengan nama database kamu
});

// Tes koneksi
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to the MySQL database.');
    connection.release();  // Pastikan koneksi dilepaskan
  } catch (error) {
    console.error('Unable to connect to the MySQL database:', error);
  }
})();

export default db;
