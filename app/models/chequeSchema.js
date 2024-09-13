import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../config/dbConnection';
import { generateUniqueIdWithDate } from '../../helper/randamFuction';
// import userSchema from './userSchema';
module.exports =(sequelize,DataTypes)=>{
 const chequeSchema= sequelize.define('v0_cheques', {
  cheque_id: {
    primaryKey: true,
    unique: true,
    type: DataTypes.STRING,
  },
  cheque_no: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  }, 
  user_id: {
    // type: DataTypes.INTEGER,
    type: DataTypes.STRING,
    unique: true,
    // allowNull: false,
    references: {
      model: 'v0_users',
      key: 'user_id',
    },
  },
  monthly_amount_limit: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue:0
  },
  payble_amount: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue:0

  },
  due_date: {
    type: DataTypes.DATE,
  },
  intrest_percentage: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  is_bounced: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  cheque_address: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  is_blocked: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    // allowNull: false,

  },
  updatedBy: {
    type: DataTypes.INTEGER,
    // allowNull: false,
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
chequeSchema.beforeCreate(instance => {
  instance.cheque_id =generateUniqueIdWithDate();
});
return chequeSchema;
}



