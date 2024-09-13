module.exports = {
  DB: {
    username: process.env.USERNAME || 'postgres',
    password: process.env.PASSWORD || '6152',
    database: process.env.DATABASE || 'postmoney',
    host: process.env.HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    logging: false,
  },
  PORT: process.env.PORT || '6060',
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || 'true',
  JWT_SECRET:
    'S-opPB65jJ6JZIM4ysi_gAlrKJnNSgAq-QDr4ZbvIvwnTCOha7tBY59LVsiDkkGF',
  NODEMAILER: 'yqwx yxsi otwy ghbh',
};
