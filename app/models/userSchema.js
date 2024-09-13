import { Sequelize, DataTypes, Model, literal } from 'sequelize';
import bcrypt from 'bcryptjs';
import { generateUniqueIdWithDate } from '../../helper/randamFuction';
module.exports = (sequelize, DataTypes) => {
  const userSchema = sequelize.define(
    'v0_users',
    {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        // allowNull: false,
        // autoIncrement: true,s
        primaryKey: true,
        unique: true,
        type: DataTypes.STRING,
      },
      name: {
        // type: DataTypes.ENUM('0', '1', '2'),
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      adhar_no: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      pan_no: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      email_otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_email_otp_verifyed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      mobile_no: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Mobile No cannot be null',
          },
          notEmpty: {
            msg: 'Mobile NO cannot be empty',
          },
        },
      },
      country_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Country Code cannot be null',
          },
          notEmpty: {
            msg: 'Country Code cannot be empty',
          },
        },
      },
      mobile_otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_mobile_otp_verifyed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      profile_img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      security_pin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_kyc_done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_login: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        // allowNull: false,
        type: DataTypes.DATE,
      },
      token: {
        type: DataTypes.TEXT,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      deletedBy: {
        type: DataTypes.STRING(100),
      },
      invitationCode: {
        type: DataTypes.STRING,
      },
      referalCode: {
        type: DataTypes.STRING,
      },
    }
    // {
    //     paranoid: true,
    //     freezeTableName: true,
    //     modelName: 'user',
    // }
  );

  // UserSchema.hasMany(walleSchema, { foreignKey: 'user_id' });
  // walleSchema.belongsTo(walleSchema, {
  //     foreignKey: 'user_id',
  // });

  // confirmPassword: {
  //     type: DataTypes.VIRTUAL,
  //     set(value) {
  //         if (this.password.length < 7) {
  //             throw new AppError(
  //                 'Password length must be grater than 7',
  //                 400
  //             );
  //         }
  //         if (value === this.password) {
  //             const hashPassword = bcrypt.hash(value, 10);
  //             this.setDataValue('password', hashPassword);
  //         } else {
  //             throw new AppError(
  //                 'Password and confirm password must be the same',
  //                 400
  //             );
  //         }
  //     },
  // },

  userSchema.beforeCreate((instance) => {
    instance.user_id = generateUniqueIdWithDate();
  });
  return userSchema;
};
// UserSchema.associate = function(models) {
//   console.log(models)
//   // UserSchema.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'})
//   UserSchema.belongsToMany(models.transactionSchema, {through: 'v0_transactions', foreignKey: 'user_id', as: 'days'})
// };

// UserSchema.associate({transactionSchema:'v0_transactions'})
