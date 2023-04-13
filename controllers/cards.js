const Card = require('../models/card');

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });

    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(res.status(400).send({
        message: 'Переданы некорректные данные при создании карточки.',
      }));
    } else {
      next(err);
    }
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);

    if (!card) {
      res.status(404).send({
        message: 'Карточка с указанным _id не найдена.',
      });
    }

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: 'Переданы некорректные данные.',
      });
    } else {
      next(err);
    }
  }
};

const handleCardLike = async (req, res, next) => {
  try {
    let action;

    if (req.method === 'PUT') {
      action = '$addToSet';
    }

    if (req.method === 'DELETE') {
      action = '$pull';
    }

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { [action]: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(404).send({
        message: 'Передан несуществующий _id карточки.',
      });
    }

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: 'Переданы некорректные данные для постановки/снятии лайка.',
      });
    } else {
      next(err);
    }
  }
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  handleCardLike,
};
