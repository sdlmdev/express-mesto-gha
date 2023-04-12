const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

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

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
