import jwt from "jsonwebtoken";
import Config from "../config";
import Utils from "../app/utils";
import { apiFailureMessage, httpConstants } from "../app/common/constants";
export default function authenticateToken(req, res, next) {
  if (!req.headers["token"]) {
    return Utils.response(
      res,
      "Your are not logged in",
      apiFailureMessage.INVALID_SESSION_TOKEN,
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.FORBIDDEN
    );
  }
  const token = req.headers["token"];

  // const token = authHeader.split(" ")[1];
  if (token == null) {
    return Utils.response(
      res,
      "Auth token is not provided",
      apiFailureMessage.INVALID_SESSION_TOKEN,
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.UNAUTHORIZED
    );
  }
  jwt.verify(token, Config.JWT_SECRET, (err, user) => {
    if (err) {
      return Utils.response(
        res,
        "Unauthorized user",
        apiFailureMessage.INVALID_SESSION_TOKEN,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    req.user = user;
    next();
  });
}
