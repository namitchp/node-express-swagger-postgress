export const httpConstants = {
  METHOD_TYPE: {
    POST: "POST",
    GET: "GET",
    PUT: "PUT",
  },
  HEADER_TYPE: {
    URL_ENCODED: "application/x-www-form-urlencoded",
    APPLICATION_JSON: "application/json",
  },
  HEADER_KEYS: {
    DEVICE_TYPE: "device-type",
    DEVICE_ID: "device-id",
    SESSION_TOKEN: "session-token",
    PUSH_TOKEN: "push-token",
  },
  DEVICE_TYPE: {
    ANDROID: "android",
    IOS: "ios",
    WEB: "web",
  },
  CONTENT_TYPE: {
    URL_ENCODE: "application/x-www-form-urlencoded",
  },
  WEBSERVICE_PATH: {
    SYNC_ATTENDANCE: "sync-attendance/",
  },

  RESPONSE_STATUS: {
    SUCCESS: true,
    FAILURE: false,
  },
  RESPONSE_CODES: {
    UNAUTHORIZED: 401,
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    OK: 200,
    NO_CONTENT_FOUND: 204,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    TOO_MANY_REQUEST: 429,
  },
  LOG_LEVEL_TYPE: {
    INFO: "info",
    ERROR: "error",
    WARN: "warn",
    VERBOSE: "verbose",
    DEBUG: "debug",
    SILLY: "silly",
    FUNCTIONAL: "functional",
    HTTP_REQUEST: "http request",
  },
};

export const stringConstants = {
  SERVICE_STATUS_HTML: "User Authentication Microservices is working fine",
};

export const genericConstants = {
  DEVICE_TYPE: {},
};

export const apiSuccessMessage = {
  FETCH_SUCCESS: "Information fetched successfully",
  CREATED_USER: "User created successfully",
  SIGNED_IN: "User signed in successfully",
  UPDATED_USER: "User updated successfully",
  AUTHERIZED: "User autherized successfully",
  DELETE_USER: "User removed successfully",
};

export const apiEndpoints = {
  GET_METERS: "/get-meters",
};

export const apiFailureMessage = {
  INVALID_PARAMS: "Invalid Parameters",
  FIND_QUERY_UPDATE_QUERY:
    "findQuery and updateQuery params are required fields",
  INVALID_REQUEST: "Invalid Request",
  INVALID_SESSION_TOKEN: "Invalid session token",
  INTERNAL_SERVER_ERROR: "Internal server Error",
  BAD_REQUEST: "Bad Request!",
  DEVICE_ID_OR_SESSION_TOKEN_EMPTY:
    "Device id or session token can't be empty or null",
  SESSION_GENERATION: "Unable to generate session!",
  SESSION_EXPIRED: "Session Expired!",
  USER_EXIST: "User Already Exist",
  NOT_FOUND: "User not found",
  WRONG_PASSWORD: "Wrong Password",
  PASSWORD_NOT_MATCH: "Password did not match with confirm password",
 ACCOUNT_EXIST: "Account Number already Exist",
};
export const role = {
  SCHOOL: "School",
};
export const permission = {
  ADMIN: "Admin",
};
export const refList = {
  1: 0.1,
  2: 0.05,
};
