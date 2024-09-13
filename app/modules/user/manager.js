import Utils from '../../utils';
import Config from '../../../config';
import jwt from 'jsonwebtoken';
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from '../../common/constants';
import {
  sendMailOtp,
  generateOTP,
  sendMailJoinUs,
} from '../../../helper/nodeMailer';
import { Base64ImageUploader } from '../../../helper/Fileupload';
import { generateReferralCode } from '../../../helper/randamFuction';
import model from '../../models';
export default class Manager {
  userLogin = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const otp = generateOTP();
    const updateObj = {
      mobile_no: req.mobile_no,
      country_code: req.country_code,
      mobile_otp: otp,
      is_mobile_otp_verifyed: false,
    };
    // if (req.invitationCode) {
    //   const verifyInvitationCode = await UserSchema.findOne({
    //     refferal_code: req.invitationCode,
    //   });
    // }
    const existsUser = await model.v0_users.findOne({
      where: { mobile_no: req.mobile_no },
    });
    if (existsUser) {
      await model.v0_users.update(
        {
          mobile_otp: otp,
          is_mobile_otp_verifyed: false,
          is_login: false,
        },
        {
          where: {
            user_id: existsUser.user_id,
          },
        }
      );
      return { mobile_no: req.mobile_no, otp: otp };
    }
    // updateObj["invitation_code"] = req.invitationCode;
    // await sendMailOtp(req.email, otp);
    let result = await model.v0_users.create(updateObj);
    return { mobile_no: result.mobile_no, otp: result.mobile_otp };
  };
  verifyLoginOtp = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const { mobile_no, otp } = req;
    const user = await model.v0_users.findOne({
      where: { mobile_no: mobile_no, is_login: false },
    });
    if (!user) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let today = new Date();
    let latest = new Date(user.updatedAt);
    let diffMs = today - latest;
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffMins >= 3) {
      return Utils.error(
        'Your Otp is Expired',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    if (user.mobile_otp != otp) {
      return Utils.error(
        'Your Mobile otp is wrong',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const payload = {
      user_id: user.user_id,
      mobile_no: mobile_no,
      name: user.name,
      is_login: true,
    };
    // const referralCode =
    //   user.refferal_code === "" ? generateReferralCode() : user.refferal_code;

    const wallet = await model.v0_wallets.findOne({
      where: { user_id: user.user_id },
    });
    const cheque = await model.v0_cheques.findOne({
      where: { cheque_address: mobile_no },
    });
    if (!cheque) {
      await model.v0_cheques.create({
        user_id: user.user_id,
        monthly_amount_limit: 5000000,
        cheque_address: mobile_no,
        cheque_no: `PM${mobile_no}`,
      });
      // return Utils.error(
      //   'Cheque Already Exists',
      //   httpConstants.RESPONSE_STATUS.FAILURE,
      //   httpConstants.RESPONSE_CODES.BAD_REQUEST
      // );
    }

    if (wallet) {
      payload.wallet_id = wallet.wallet_id;
      const token = jwt.sign(payload, Config.JWT_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 7,
      });
      if (!token) {
        return Utils.error(
          apiFailureMessage.INTERNAL_SERVER_ERROR,
          httpConstants.RESPONSE_STATUS.FAILURE,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      }
      await model.v0_users.update(
        {
          is_login: true,
          is_mobile_otp_verifyed: true,
          token: token,
        },
        {
          where: {
            user_id: user.user_id,
          },
        }
      );
      return {
        token: token,
        user_id: user.user_id,
        country_code: user.country_code,
        is_login: true,
        wallet_id: wallet.wallet_id,
        cheque_no: `PM${mobile_no}`,
        is_kyc_done: user.is_kyc_done,
      };
    }
    const walletDetail = await model.v0_wallets.create({
      user_id: user.user_id,
      wallet_address: user.mobile_no,
    });
    payload.wallet_id = walletDetail.wallet_id;
    const token = jwt.sign(payload, Config.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 7,
    });
    if (!token) {
      return Utils.error(
        apiFailureMessage.INTERNAL_SERVER_ERROR,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    await model.v0_users.update(
      {
        is_login: true,
        is_mobile_otp_verifyed: true,
        token: token,
      },
      {
        where: {
          user_id: user.user_id,
        },
      }
    );
    return {
      token: token,
      user_id: user.user_id,
      wallet_id: walletDetail.wallet_id,
      country_code: user.country_code,
      is_login: true,
      cheque_no: `PM${mobile_no}`,
      is_kyc_done: user.is_kyc_done,
    };
  };
  updateProfile = async (req, user) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const userDetail = await model.v0_users.findOne({
      where: { user_id: user.user_id },
    });
    if (!userDetail) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const image = await Base64ImageUploader(req.profile_img);
    if (!image) {
      return Utils.error(
        apiFailureMessage.BAD_REQUEST,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    await model.v0_users.update(
      {
        profile_img: image,
      },
      {
        where: {
          user_id: user.user_id,
        },
      }
    );
    return {
      message: 'success',
      url: image,
      user_id: userDetail.user_id,
      is_kyc_done: userDetail.is_kyc_done,
    };
  };
  userDetailUpdate = async (req, user) => {
    let user_id = user.user_id;
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const payload = {
      name: req.name,
      dob: req.dob,
      email: req.email,
      adhar_no: req.adhar_no,
      pan_no: req.pan_no,
      is_kyc_done: true,
    };
    const adhar = await model.v0_users.findOne({
      where: {
        adhar_no: req.adhar_no,
      },
    });
    if (adhar) {
      return Utils.error(
        'Adhar No is already Exists',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const pan = await model.v0_users.findOne({
      where: {
        pan_no: req.pan_no,
      },
    });
    if (pan) {
      return Utils.error(
        'Pan No is already Exists',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const email_id = await model.v0_users.findOne({
      where: {
        email: req.email,
      },
    });
    if (email_id) {
      return Utils.error(
        'Email Id is Already exist',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const userDetail = await model.v0_users.findOne({
      where: {
        user_id: user_id,
        is_login: true,
        is_kyc_done: false,
      },
    });
    if (!userDetail) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    await model.v0_users.update(payload, {
      where: { user_id: user_id },
    });
    return {
      user_id,
      isLogin: true,
      is_kyc_done: true,
    };
  };
  registerAccountDetails = async (req, user_id) => {
    if (!req && !user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const accountDetail = await model.v0_banks.findOne({
      where: { account_number: req.account_number },
    });
    if (accountDetail) {
      return Utils.error(
        apiFailureMessage.ACCOUNT_EXIST,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let result = await model.v0_banks.create({
      user_id,
      bank_name: req.bank_name,
      ifsc: req.ifsc,
      branch_name: req.branch_name,
      branch_name_address: req.branch_name_address,
      account_number: req.account_number,
      account_type: req.account_type,
    });
    return result;
  };
  useProfile = async (user_id) => {
    if (!user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const [results, metadata] = await model.sequelize.query(
      `select u.user_id,u.name,u.email,u.adhar_no,u.pan_no,u.is_email_otp_verifyed,u.mobile_no,u.country_code,u.dob,u.is_mobile_otp_verifyed,u.profile_img,u.is_kyc_done,u.is_login,u."createdAt",u."updatedAt",c.cheque_id,c.cheque_no ,w.wallet_id from v0_users u
       INNER JOIN v0_cheques c ON (c.user_id = u.user_id) 
       INNER JOIN v0_wallets w ON (w.user_id = u.user_id) WHERE u.user_id='${user_id}'`
    );
    // console.log(sequelize.models.v0_cheques)
    // console.log(model.Sequelize.Op)

    // const results = await model.v0_users.findAll({
    //   where: { user_id: user_id },
    //   include: [
    //     {
    //       model: model.v0_cheques,
    //       // as: 'cheque', // Alias for the joined table
    //       // required: true, // Optional: include posts even if there are none
    //       // attributes: ['cheque_id', 'cheque_no'], // Specify which columns to select from Post
    //     },
    //     // {
    //     //   model: model.v0_wallets,
    //     //   as: 'wallet', // Alias for the joined table
    //     //   required: true, // Optional: include posts even if there are none
    //     //   attributes: ['wallet_id'], // Specify which columns to select from Post
    //     // },
    //   ],

    //   // attributes:['user_id','cheque.cheque_no']
    // });
    // console.log(results);
    console.log(metadata);
    if (!results.length>0) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return results[0];
  };
  getUserList = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const page = req.page || 1;
    const limit = req.limit || 10;
    const offset = (page - 1) * limit;
    const userList = await model.v0_users.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    if (!userList) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return {
      pagination: {
        current_page: page,
        limit,
        total_page: Math.ceil(+userList.count / limit),
      },
      data: userList.rows,
    };
  };
  getUserWithSearch = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const { mobile_no } = req || '';
    const userList = await model.v0_users.findAll({
      where: {
        mobile_no: {
          [model.Sequelize.Op.like]: `%${mobile_no}%`,
        },
      },
    });
    if (!userList) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return userList;
  };
  logOut = async (user_id) => {
    if (!user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const userDetail = await model.v0_users.findOne({ where: { user_id } });
    if (!userDetail) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    await model.v0_users.update(
      {
        token: null,
        is_mobile_otp_verifyed: false,
        is_login: false,
      },
      {
        where: { user_id: user_id },
      }
    );
    return { user_id, message: 'Log out', is_login: false };
  };
}
