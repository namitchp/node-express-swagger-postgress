import Utils from '../../utils';
import {
  apiSuccessMessage,
  apiFailureMessage,
  httpConstants,
} from '../../common/constants';
import BLManager from './manager';
const sendEmailHelper = require('../../../helper/email');
//const mailer = new sendEmailHelper();
export default class Index {
  async userLogin(req, res) {
    const [error, userResponse] = await Utils.parseResponse(
      new BLManager().userLogin(req.body)
    );
    if (error || !userResponse) {
      return Utils.handleError(error, req, res);
    }
    if (userResponse.code && userResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        userResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      userResponse,
      'OTP Sent Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async verifyLoginOtp(req, res) {
    const [error, verifyOtpUserResponse] = await Utils.parseResponse(
      new BLManager().verifyLoginOtp(req.body)
    );
    if (error || !verifyOtpUserResponse) {
      return Utils.handleError(error, req, res);
    }
    if (verifyOtpUserResponse.code && verifyOtpUserResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        verifyOtpUserResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      verifyOtpUserResponse,
      'OTP Verify Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async updateProfile(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().updateProfile(req.body, req.user)
    );
    if (error || !response) {
      return Utils.handleError(error, req, res);
    }
    if (response.code && response.code !== 200) {
      return Utils.response(
        res,
        {},
        response.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      response,
      'Data updated successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async registerUserDetail(req, res) {
    const [error, kycUpdate] = await Utils.parseResponse(
      new BLManager().userDetailUpdate(req.body, req.user)
    );
    if (error || !kycUpdate) {
      return Utils.handleError(error, req, res);
    }
    if (kycUpdate.code && kycUpdate.code !== 200) {
      return Utils.response(
        res,
        {},
        kycUpdate.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      kycUpdate,
      'Kyc Compleate',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async registerAccountDetails(req, res) {
    const [error, ceateAccount] = await Utils.parseResponse(
      new BLManager().registerAccountDetails(req.body, req.user.user_id)
    );
    if (error || !ceateAccount) {
      return Utils.handleError(error, req, res);
    }
    if (ceateAccount.code && ceateAccount.code !== 200) {
      return Utils.response(
        res,
        {},
        ceateAccount.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      ceateAccount,
      'Account Created',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getUserProfile(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().useProfile(req.user.user_id)
    );
    if (error || !response) {
      return Utils.handleError(error, req, res);
    }
    if (response.code && response.code !== 200) {
      return Utils.response(
        res,
        {},
        response.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      response,
      "Data fetched successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async getUserProfile(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().useProfile(req.user.user_id)
    );
    if (error || !response) {
      return Utils.handleError(error, req, res);
    }
    if (response.code && response.code !== 200) {
      return Utils.response(
        res,
        {},
        response.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      response,
      "Data fetched successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getUserList(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().getUserList(req.query)
    );
    if (error || !response) {
      return Utils.handleError(error, req, res);
    }
    if (response.code && response.code !== 200) {
      return Utils.response(
        res,
        {},
        response.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      response,
      "Data fetched successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getUserWithSearch(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().getUserWithSearch(req.query)
    );
    if (error || !response) {
      return Utils.handleError(error, req, res);
    }
    if (response.code && response.code !== 200) {
      return Utils.response(
        res,
        {},
        response.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      response,
      "Data fetched successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async logOut(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().logOut(req.user.user_id)
    );
    if (error || !response) {
      return Utils.handleError(error, req, res);
    }
    if (response.code && response.code !== 200) {
      return Utils.response(
        res,
        {},
        response.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      response,
      "Log Out successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
}
