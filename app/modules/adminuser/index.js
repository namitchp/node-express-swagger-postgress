import Utils from "../../utils";
import {
  apiSuccessMessage,
  apiFailureMessage,
  httpConstants,
} from "../../common/constants";
import BLManager from "./manager";
const sendEmailHelper = require("../../../helper/email");
//const mailer = new sendEmailHelper();
import mongoose from "mongoose";
export default class Index {
  async registerAdminUser(req, res) {
    const [error, userAdminResponse] = await Utils.parseResponse(
      new BLManager().registerAdminUser(req.body)
    );

    if (error || !userAdminResponse) {
      return Utils.handleError(error, req, res);
    }
    if (userAdminResponse.code && userAdminResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        userAdminResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    return Utils.response(
      res,
      {},
      "Admin Register Successfully",
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  // async userAdminLogin(req, res) {
  //   const [error, loginAdminUserResponse] = await Utils.parseResponse(
  //     new BLManager().userAdminLogin(req)
  //   );
  //   if (error || !loginAdminUserResponse) {
  //     return Utils.handleError(error, req, res);
  //   }
  //   if (loginAdminUserResponse.code && loginAdminUserResponse.code !== 200) {
  //     return Utils.response(
  //       res,
  //       {},
  //       loginAdminUserResponse.data,
  //       httpConstants.RESPONSE_STATUS.FAILURE,
  //       httpConstants.RESPONSE_CODES.FORBIDDEN
  //     );
  //   }
  //   return Utils.response(
  //     res,
  //     loginAdminUserResponse,
  //     apiSuccessMessage.SIGNED_IN,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  // async fetchUserList(req, res) {
  //   const [error, response] = await Utils.parseResponse(
  //     new BLManager().fetchUserList(req.query)
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
  //     apiSuccessMessage.FETCH_SUCCESS,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  // async updateUserById(req, res) {
  //   const [error, response] = await Utils.parseResponse(
  //     new BLManager().updateUserById(req.body)
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
  //     apiSuccessMessage.UPDATED_USER,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  // async fetchTransactionList(req, res) {
  //   const [error, response] = await Utils.parseResponse(
  //     new BLManager().fetchTransactionList(req.query)
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
  //     apiSuccessMessage.FETCH_SUCCESS,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  // async fetchTransactionById(req, res) {
  //   const [error, response] = await Utils.parseResponse(
  //     new BLManager().fetchTransactionById(req.query)
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
  //     apiSuccessMessage.FETCH_SUCCESS,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  // async updateTransactionById(req, res) {
  //   const [error, response] = await Utils.parseResponse(
  //     new BLManager().updateTransactionById(req.body)
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
  //     apiSuccessMessage.UPDATED_USER,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  // async updateQR(req, res) {
  //   const [error, response] = await Utils.parseResponse(
  //     new BLManager().updateQR(req.body)
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
  //     apiSuccessMessage.UPDATED_USER,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  // async fetchQR(req, res) {
  //   const [error, response] = await Utils.parseResponse(
  //     new BLManager().fetchQR(req.query)
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
  //     apiSuccessMessage.FETCH_SUCCESS,
  //     httpConstants.RESPONSE_STATUS.SUCCESS,
  //     httpConstants.RESPONSE_CODES.OK
  //   );
  // }
  //fetch erning list by id
}
