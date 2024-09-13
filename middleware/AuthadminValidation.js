import Utils from "../app/utils";

import * as yup from "yup";
const StatusArray = [
  "DELETE",
  "UNBLOCK",
  "BLOCK",
  "KYCAPPROVED",
  "KYCUNAPPROVED",
];
module.exports = {
  validateCreateAdmin: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateLoginAdmin: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  getUserByAdmin: async (req, res, next) => {
    const schema = yup.object().shape({
      pageNo: yup.number().min(1).required(),
      limit: yup.number().min(1).required(),
    });
    await validate(schema, req.body, res, next);
  },
  updateUserByAdmin: async (req, res, next) => {
    const schema = yup.object().shape({
      userId: yup.string().required(),
      status: yup.string().oneOf(StatusArray),
    });
    await validate(schema, req.query, res, next);
  },
  uploadfileByAdmin: async (req, res, next) => {
    const schema = yup.object().shape({
      file: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },

  validateVerifyOtpAdmin: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      otp: yup.number().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateForgotPasswordAmin: async (req, res, next) => {
    const schema = yup.object().shape({
      //  email: yup.string().email().required(),
      newPassword: yup.string().required(),
      confirmPassword: yup.string().required(),
      //  otp: yup.number().required(),
    });
    await validate(schema, req.body, res, next);
  },

  validateSendOtpAdmin: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateAdminCreateTermAndCondition: async (req, res, next) => {
    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
      type: yup
        .string()
        .oneOf(["TERM", "POLICY", "USERAGREEMENT", "DISCLAIMER", "GITPAPER"]),
      //  otp: yup.number().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateAdminGetTermAndCondition: async (req, res, next) => {
    const schema = yup.object().shape({
      type: yup
        .string()
        .oneOf(["TERM", "POLICY", "USERAGREEMENT", "DISCLAIMER", "GITPAPER"]),
    });
    await validate(schema, req.query, res, next);
  },
  validateAdminCreateToken: async (req, res, next) => {
    const schema = yup.object().shape({
      token_symbol: yup.string().required("Token Symbol is required"),
      token_name: yup.string().required("Token Name is required"),
      issuer: yup.string().required("Issuer is required"),
      token_currencies: yup.string().required("Token Currencies is Required"),
    });
    await validate(schema, req.body, res, next);
  },
};

const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });

    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,

      message,

      value,
    }));

    Utils.responseForValidation(res, errors);
  }
};
