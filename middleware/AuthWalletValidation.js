import Utils from '../app/utils';
import * as yup from 'yup';
module.exports = {
  createWalletValidation: async (req, res, next) => {
    const schema = yup.object().shape({
      wallet_pin: yup.number().required(),
    });
    await validate(schema, req.body, res, next);
  },
  walletWithdrawalValidation: async (req, res, next) => {
    const schema = yup.object().shape({
      amount: yup.number().required(),
      type: yup.string().required(),
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
