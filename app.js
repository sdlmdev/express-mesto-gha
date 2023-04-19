const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const handleError = require('./middlewares/handleError');
const auth = require('./middlewares/auth');

const {
  MONGODB_URI = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
} = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый адрес не найден.',
  });
});
app.use(errors());
app.use(handleError);

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
