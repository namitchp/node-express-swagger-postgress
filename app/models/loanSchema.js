import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../../config/dbConnection';
module.exports = (sequelize,DataTypes)=>{



const loanSchema=sequelize.define('v0_loans', {
  loan_id: {
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
  loan_account_no: {
    type: DataTypes.STRING(),
    unique: true,
    allowNull: false,
  },
  eligible_amount: {
    type: DataTypes.DOUBLE,
    defaultValue:0

  },
  is_eligible: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  transaction_has: {
    type: DataTypes.STRING,
  },
  outstanding_amount: {
    type: DataTypes.DOUBLE,
    defaultValue:0
  },
  loan_amount: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  emi_period: {
    type: DataTypes.INTEGER,
    defaultValue:0

  },
  monthly_emi: {
    type: DataTypes.DOUBLE,
    defaultValue:0
  },
  intrest_rate: {
    type: DataTypes.DOUBLE,
    defaultValue:0
  },
  panelty: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  emi_paid: {
    type: DataTypes.DOUBLE,
    defaultValue:0
  },
  emi_pending: {
    type: DataTypes.DOUBLE,
    defaultValue:0
  },
  remark: {
    type: DataTypes.STRING,
    defaultValue: 0,
  },
  upcoming_emi: {
    type: DataTypes.DATE,
    defaultValue: 0,
  },
  is_satteld: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  is_emi_start: {
    type: DataTypes.BOOLEAN,
    defaultValue:false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue:false
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
loanSchema.beforeCreate(instance => {
  instance.loan_id =generateUniqueIdWithDate();
});
return loanSchema
}
