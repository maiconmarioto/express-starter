require('dotenv').config({ path: './.env' });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  database: {
    host: process.env.DB_HOST
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
};
