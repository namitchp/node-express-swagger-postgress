import { DataTypes } from 'sequelize';
// import sequelize from '../../config/dbConnection';
// import model, { sequelize } from '.';
import bcrypt from 'bcryptjs';
import AppError from '../utils/parser';
import { generateUniqueIdWithDate } from '../../helper/randamFuction';
module.exports = (sequelize, DataTypes) => {
  const bankDetailSchema = sequelize.define('v0_banks', {
    bank_id: {
      primaryKey: true,
      unique: true,
      type: DataTypes.STRING,
    },
    user_id: {
      // type: DataTypes.INTEGER,
      type: DataTypes.STRING,
      // allowNull: false,
      references: {
        model: 'v0_users',
        key: 'user_id',
      },
    },
    bank_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    ifsc: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    branch_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    account_number: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    account_type: {
      type: DataTypes.STRING(50),
      defaultValue: 'Primary',
    },
    is_deleted: {
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
  bankDetailSchema.beforeCreate((instance) => {
    instance.bank_id = generateUniqueIdWithDate();
  });
  return bankDetailSchema;
};
