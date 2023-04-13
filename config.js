const {
  MONGODB_URI = 'mongodb://localhost:27017/mestodb',
  PORT = 3000,
} = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
};
