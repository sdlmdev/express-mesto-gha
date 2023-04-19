const usersRouter = require('express').Router();
const { validationUserId, validationUserInfo, validationAvatar } = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  editProfile,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserById);
usersRouter.get('/:id', validationUserId, getUserById);
usersRouter.patch('/me', validationUserInfo, editProfile);
usersRouter.patch('/me/avatar', validationAvatar, editProfile);

module.exports = usersRouter;
