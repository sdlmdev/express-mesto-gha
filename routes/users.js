const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  editProfile,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserById);
usersRouter.get('/:id', getUserById);
usersRouter.patch('/me', editProfile);
usersRouter.patch('/me/avatar', editProfile);

module.exports = usersRouter;
