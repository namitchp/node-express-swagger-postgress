import Utils from "../../utils";
import Config from "../../../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
import UserSchema from "../../models/customerSchema";
import mongoose from "mongoose";
import {
  Base64ImageUploader,
  Base64PdfUploader,
} from "../../../helper/Fileupload";
import AdminuserSchema from "../../models/adminSchema";
import qrCodeSchema from "../../models/qrCodeSchema";
export default class Manager {
  registerAdminUser = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    const user = await AdminuserSchema.findOne({ email: req.email });
    if (user && user.email) {
      return Utils.error(
        apiFailureMessage.USER_EXIST,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    const salt = await bcrypt.genSalt(10);
    req.password = await bcrypt.hash(req.password, salt);

    const data = await AdminuserSchema.create({
      email: req.email,
      password: req.password,
    });
    if (data) {
      return data;
    }
  };

  userAdminLogin = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    const email = req.body.email;
    const user = await AdminuserSchema.findOne({ email: email });
    if (!user) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      return Utils.error(
        apiFailureMessage.WRONG_PASSWORD,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    const payload = {
      adminUserId: user._id,
      isLogin: true,
      email: user.email,
      userType: "ADMINICO",
    };
    const token = await jwt.sign(payload, Config.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 7,
    });

    if (!token) {
      return Utils.error(
        apiFailureMessage.INTERNAL_SERVER_ERROR,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }

    return {
      token: token,
      adminUserId: user._id,
      isLogin: true,
      email: user.email,
    };
  };
  fetchUserList = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const page = req.page || 1;
    const limit = req.limit || 10;
    const search = req.type || "";
    if (search !== "") {
      matchQuery["mobile"] = search;
    }
    const pipeline = [
      { $match: matchQuery },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            {
              $addFields: {
                current_page: page,
                total_page: { $ceil: { $divide: ["$total", limit] } },
              },
            },
          ],
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
        },
      },
    ];
    return await UserSchema.findDataWithAggregate(pipeline);
  };
  updateUserById = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return await UserSchema.findOneAndUpdateData(
      {
        _id: mongoose.Types.ObjectId(req.userId),
      },
      req.updateQuery
    );
  };
  fetchTransactionList = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const page = req.page || 1;
    const limit = req.limit || 10;
    const type = req.type || "";
    const status = req.status || "";
    if (type !== "") {
      matchQuery["type"] = type;
    }
    if (status !== "") {
      matchQuery["status"] = status;
    }
    const pipeline = [
      { $match: matchQuery },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            {
              $addFields: {
                current_page: page,
                total_page: { $ceil: { $divide: ["$total", limit] } },
              },
            },
          ],
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
        },
      },
    ];
    return await TransactionSchema.findDataWithAggregate(pipeline);
  };

  fetchTransactionById = async (req) => {
    return await TransactionSchema.findOneData({
      _id: mongoose.Types.ObjectId(req.id),
    });
  };
  updateTransactionById = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return await UserSchema.findOneAndUpdateData(
      {
        _id: mongoose.Types.ObjectId(req.id),
      },
      req.updateQuery
    );
  };
  updateQR = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const qr = await Base64ImageUploader(req.qrImage);
    return await qrCodeSchema.findOneAndUpdateData(
      {},
      { qr: qr },
      { upsert: true, new: true }
    );
  };
  fetchQR = async (req) => {
    return await qrCodeSchema.findOneData();
  };
}
