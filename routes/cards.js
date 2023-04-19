const cardsRouter = require('express').Router();
const { validationCard, validationCardId } = require('../middlewares/validation');
const {
  createCard,
  getCards,
  deleteCard,
  handleCardLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', validationCard, createCard);
cardsRouter.delete('/:id', validationCardId, deleteCard);
cardsRouter.put('/:id/likes', validationCardId, handleCardLike);
cardsRouter.delete('/:id/likes', validationCardId, handleCardLike);

module.exports = cardsRouter;
