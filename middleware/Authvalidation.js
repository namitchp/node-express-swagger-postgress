import Utils from '../app/utils';
import * as yup from 'yup';
module.exports = {
  validateRegisterUser: async (req, res, next) => {
    const schema = yup.object().shape({
      name: yup.string().required(),
      adhar_no: yup.string().label('adhar no').min(12).max(12).required(),
      email: yup.string().required().email(),
      pan_no: yup.string().label('pan no').min(10).max(10).required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateRegisterAccount: async (req, res, next) => {
    const schema = yup.object().shape({
      bank_name: yup.string().required(),
      ifsc: yup.string().required(),
      branch_name: yup.string().required(),
      branch_name_address: yup.string().required(),
      account_number: yup.string().required(),
      account_type: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateLoginUser: async (req, res, next) => {
    const schema = yup.object().shape({
      mobile_no: yup.string().min(10).max(10).required(),
      country_code: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
  validateVerifyOtpUser: async (req, res, next) => {
    const schema = yup.object().shape({
      mobile_no: yup.string().min(10).max(10).required(),
      otp: yup.number().required(),
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
