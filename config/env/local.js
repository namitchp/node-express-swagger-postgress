
module.exports = {
  DB: {
    "username": process.env.USERNAME || 'postgres',
    "password": process.env.PASSWORD || 'india@123',
    "database": process.env.DATABASE || 'postmoney',
    "host": process.env.HOST || '13.60.4.16',
    // port: process.env.DB_PORT || 5432,
    "dialect": 'postgres',
    ssl:true,
    logging: false,
  },
  PORT: process.env.PORT || '6060',
  use_env_variable:true,
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || 'true',
  JWT_SECRET:
    'S-opPB65jJ6JZIM4ysi_gAlrKJnNSgAq-QDr4ZbvIvwnTCOha7tBY59LVsiDkkGF',
  NODEMAILER: 'yqwx yxsi otwy ghbh',
};
