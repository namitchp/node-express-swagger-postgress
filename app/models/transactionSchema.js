import { DataTypes } from 'sequelize';
import sequelize from '../../config/dbConnection';
import { generateUniqueIdWithDate } from '../../helper/randamFuction';
import userSchema from '../models/userSchema'
import walleSchema from '../models/walletSchema'
import chequeSchema from './chequeSchema'
module.exports=(sequelize,DataTypes)=>{
  const transactionSchema=sequelize.define('v0_transactions', {
  transaction_id: {
    primaryKey: true,
    unique: true,
    type: DataTypes.STRING,
  },
  transaction_no: {
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
  from_wallet_id: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'v0_wallets',
      key: 'wallet_id',
    },
  },
  to_wallet_id: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'v0_wallets',
      key: 'wallet_id',
    },
  },
  bank_id: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'v0_banks',
      key: 'bank_id',
    },
  },
  source: {
    type: DataTypes.STRING(100),
  },
  from_cheque_id: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'v0_cheques',
      key: 'cheque_id',
    },
  },
  to_cheque_id: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'v0_cheques',
      key: 'cheque_id',
    },
  },
  wallet_type: {
    type: DataTypes.STRING,
  },
  revision: {
    type: DataTypes.BIGINT,
    defaultValue: 1,
  },
  is_bank_transaction: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  transaction_has: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  penalty: {
    type: DataTypes.DOUBLE,
  },
  transaction_date: {
    type: DataTypes.DATE,
  },
  transaction_type: {
    type: DataTypes.ENUM,
    values: ['Wallet', 'Cheque', 'Loan'],
    allowNull: false,
  },
  settlement_date: {
    type: DataTypes.DATE,
  },
  reschedule_settlement_date: {
    type: DataTypes.DATE,
  },
  is_satteld: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['Pending', 'Success', 'Reject', 'Processing', 'Reschedule'],
    defaultValue: 'Pending',
  },
  reschedule_status: {
    type: DataTypes.ENUM,
    values: ['Pending', 'Success', 'Reject', 'Processing', 'Reschedule'],
    defaultValue: 'Pending',
  },
  transaction_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  latest_Cheque: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  remarks: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});
transactionSchema.beforeCreate((instance) => {
  instance.transaction_id = generateUniqueIdWithDate();
});
return transactionSchema
}
// userSchema.hasMany(transactionSchema, { foreignKey: 'user_id',as :'user' }); // Profile has one User
// transactionSchema.belongsTo(userSchema);





