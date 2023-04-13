const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const {
  MONGODB_URI = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '6432d4a409181a13884ff832',
  };

  next();
});
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый адрес не найден.',
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log('Подключено к MongoDB');
    await app.listen(PORT);
    console.log(`Сервер запущен на порте: ${PORT}`);
  } catch (err) {
    console.log('Ошибка подключения к MongoDB', err);
  }
};

startServer();
