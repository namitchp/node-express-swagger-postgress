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
  async createWalletPin(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().createWalletPin(req.body, req.user.user_id)
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
      'Transaction created Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async createTransaction(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().createTransaction(req.body, req.user.user_id)
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
      'Transaction created Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getTransactionList(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().getTransactionList(req.query, req.user)
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
      'Transaction fetch Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getWalletBalance(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().getWalletBalance(req.user.user_id)
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
      'Wallet Balance fetch Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

}
