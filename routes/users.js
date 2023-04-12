const usersRouter = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  editProfile,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', editProfile);
usersRouter.patch('/me/avatar', editProfile);

module.exports = usersRouter;
