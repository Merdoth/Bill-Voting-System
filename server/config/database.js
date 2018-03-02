module.exports = {
  url: 'mongodb://127.0.0.1:27017/billvotingdb',
  url_production: process.env.MONGODB_URI,
  url_test: process.env.MONGODB_TEST_URI,
};
