const env = process.env.NODE_ENV || 'development';
const apiEnvironment = {
  development: {
    api: 'https://swapi.co/api',
  },
  production: {
    api: 'https://swapi.co/api',
  },
};
module.exports = apiEnvironment[env];
