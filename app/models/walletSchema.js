import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../config/dbConnection';
// import model from '.';
import { generateUniqueIdWithDate } from '../../helper/randamFuction';
// import userSchema from './userSchema';
module.exports = (sequelize, DataTypes) => {
  const walletSchema = sequelize.define('v0_wallets', {
    wallet_id: {
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
    },
    user_id: {
      // type: DataTypes.INTEGER,
      type: DataTypes.STRING,
      unique: true,
      references: {
        model: 'v0_users',
        key: 'user_id',
      },
    },
    wallet_address: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    total_deposite: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    wallet_pin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    createdAt: {
      // allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      // allowNull: false,
      type: DataTypes.DATE,
    },
  });
  walletSchema.beforeCreate((instance) => {
    instance.wallet_id = generateUniqueIdWithDate();
  });

  walletSchema.associate = function(models) {
    // associations can be defined here
    // models.v0_users.hasOne(walletSchema, { foreignKey: 'user_id',as :'wallet' }); 
    // walletSchema.belongsTo(models.v0_users);
  };
  return walletSchema;
};