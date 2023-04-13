const User = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    next(res.status(500).send({
      message: 'На сервере произошла ошибка',
    }));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).send({
        message: 'Пользователь по указанному _id не найден.',
      });
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: 'Переданы некорректные данные.',
      });
    } else {
      next(res.status(500).send({
        message: 'На сервере произошла ошибка',
      }));
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });

    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(res.status(400).send({
        message: 'Переданы некорректные данные при создании пользователя.',
      }));
    } else {
      next(res.status(500).send({
        message: 'На сервере произошла ошибка',
      }));
    }
  }
};

const editProfile = async (req, res, next) => {
  try {
    const action = {};

    if (req.path === '/me/avatar') {
      action.avatar = req.body.avatar;
    } else {
      action.name = req.body.name;
      action.about = req.body.about;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      action,
      { new: true, runValidators: true },
    );

    if (!user) {
      res.status(404).send({
        message: 'Пользователь с указанным _id не найден.',
      });
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({
        message: `Переданы некорректные данные при обновлении ${req.path === '/me/avatar' ? 'аватара' : 'профиля'}.`,
      });
    } else {
      next(res.status(500).send({
        message: 'На сервере произошла ошибка',
      }));
    }
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  editProfile,
};
