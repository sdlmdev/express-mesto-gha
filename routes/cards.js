const cardsRouter = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  handleCardLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCard);
cardsRouter.put('/:id/likes', handleCardLike);
cardsRouter.delete('/:id/likes', handleCardLike);

module.exports = cardsRouter;
