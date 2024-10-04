import Hapi from '@hapi/hapi';
import {
  registerUser,
  loginUser,
  logoutUser,
  AddCard,
  getAllCards,
  getCardById,
  deleteCardById,
  setPin,
  inquiryTransaction
} from './router.js';

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  });

  // Definisikan route
  server.route([
    {
      method: 'POST',
      path: '/user',
      handler: registerUser,
    },
    {
      method: 'POST',
      path: '/login',
      handler: loginUser,
    },
    {
      method: 'POST',
      path: '/logout',
      handler: logoutUser,
    },
    {
      method: 'POST',
      path: '/addCard',
      handler: AddCard,
    },
    {
      method: 'GET',
      path: '/getCardList',
      handler: getAllCards,
    },
    {
      method: 'GET',
      path: '/getCardDetail/{id}',
      handler: getCardById,
    },
    {
      method: 'POST',
      path: '/deleteCard/{id}',
      handler: deleteCardById,
    },
    {
      method: 'POST',
      path: '/setPin/{id}',
      handler: setPin,
    },
    {
      method: 'POST',
      path: '/inquiryTransaction',
      handler: inquiryTransaction,
    },
    
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
