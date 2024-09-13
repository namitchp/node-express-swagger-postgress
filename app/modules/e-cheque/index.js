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
  async createEcheque(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().createEcheque(req.body)
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
      'E cheque created Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async createTransaction(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().createChequeTransaction(req.body, req.user.user_id)
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
      'Cheque created Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  // async getTransactionList(req, res) {
  //   const [error, response] = await Utils.parseResponse(
  //     new BLManager().getTransactionList(req.query, req.user.user_id)
  //   );
  //   if (error || !response) {
  //     return Utils.handleError(error, req, res);
  //   }
  //   if (response.code && response.code !== 200) {
  //     return Utils.response(
  //       res,
  //       {},
  //       response.data,
  //       httpConstants.RESPONSE_STATUS.FAILURE,
  //       httpConstants.RESPONSE_CODES.FORBIDDEN
  //     );
  //   }
  //   return Utils.response(
  //     res,
  //     response,
  //     'Transaction fetch Successfully',
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  async getTransactionListSendAndRecive(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().getTransactionListSendAndRecive(
        req.query,
        req.user.user_id
      )
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

  async getTransactionListReschedule(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().getTransactionListReschedule(
        req.query,
        req.user.user_id
      )
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
  async getChequeBalance(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().getChequeBalance(req.user.user_id)
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
  async reseduleCheque(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().reseduleCheque(req.body, req.user.user_id)
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
      'Reschedule Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async chequeApproved(req, res) {
    const [error, response] = await Utils.parseResponse(
      new BLManager().chequeApproved(req.body, req.user)
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
      'Approve Successfully',
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
}
