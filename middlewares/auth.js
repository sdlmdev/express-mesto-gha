const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // const token = req.headers.authorization.replace('Bearer ', '');

  // if (!token || !req.headers.authorization.startsWith('Bearer ')) {
  //   return next(new UnauthorizedError('Необходима авторизация'));
  // }

  let payload;
  const token = req.cookies.jwt;

  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  try {
    payload = jwt.verify(token, 'some-secret-key');
    req.user = payload;
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  next();
};
