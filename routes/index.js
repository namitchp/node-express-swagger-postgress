import * as Validator from '../middleware/Authvalidation';
import userCollection from '../app/modules/user';
// import authenticateAdminToken from '../middleware/auth';
import authenticateToken from '../middleware/auth';
import swaggerOpenApi from './swaggerOpenApi';
import * as WalletValidation from '../middleware/AuthWalletValidation';
import walletCollection from '../app/modules/wallet';
import EchequeCollection from '../app/modules/e-cheque';
module.exports = async (app) => {
  swaggerOpenApi();
  //userCollection
  app.post(
    '/v0/user/login',
    Validator.validateLoginUser,
    new userCollection().userLogin
  );
  app.post(
    '/v0/user/otp_verify',
    Validator.validateVerifyOtpUser,
    new userCollection().verifyLoginOtp
  );

  app.post(
    '/v0/user/complete_user_detail',
    Validator.validateRegisterUser,
    authenticateToken,
    new userCollection().registerUserDetail
  );

  app.post(
    '/v0/user/update-user-profile',
    authenticateToken,
    new userCollection().updateProfile
  );

  app.post(
    '/v0/user/register_account_detail',
    Validator.validateRegisterAccount,
    authenticateToken,
    new userCollection().registerAccountDetails
  );
  app.get(
    '/v0/user/user_profile_detail',
    authenticateToken,
    new userCollection().getUserProfile
  );
  app.get(
    '/v0/user/get_user_list_search',
    authenticateToken,
    new userCollection().getUserWithSearch
  );
  app.get(
    '/v0/user/log_out',
    authenticateToken,
    new userCollection().logOut
  );
//wallet
  app.post(
    '/v0/wallet/createWalletPin',
    WalletValidation.createWalletValidation,
    authenticateToken,
    new walletCollection().createWalletPin
  );
  app.post(
    '/v0/wallet/withdraw_and_deposite',
    WalletValidation.walletWithdrawalValidation,
    authenticateToken,
    new walletCollection().createTransaction
  );
  app.get(
    '/v0/transaction/get_transaction_list',
    authenticateToken,
    new walletCollection().getTransactionList
  )
  app.get(
    '/v0/wallet/get_wallet_balance',
    authenticateToken,
    new walletCollection().getWalletBalance
  );

  //E-cheque

  app.post(
    '/v0/e_cheque/create_cheque_new',
    authenticateToken,
    new EchequeCollection().createTransaction
  );
  app.post(
    '/v0/e_cheque/reschedule_cheque',
    authenticateToken,
    new EchequeCollection().reseduleCheque
  );
  // app.get(
  //   '/v0/e_cheque/get_transaction_list',
  //   authenticateToken,
  //   new EchequeCollection().getTransactionList
  // )
  app.get(
    '/v0/e_cheque/get_transaction_list_recive_and_send',
    authenticateToken,
    new EchequeCollection().getTransactionListSendAndRecive
  )
  app.get(
    '/v0/e_cheque/get_transaction_reschedule_list_recive_and_send',
    authenticateToken,
    new EchequeCollection().getTransactionListReschedule
  )
  app.get(
    '/v0/e_cheque/get_cheque_balance',
    authenticateToken,
    new EchequeCollection().getChequeBalance
  );
  app.post(
    '/v0/e_cheque/approve_cheque',
    authenticateToken,
    new EchequeCollection().chequeApproved
  );
  //Admin    
  app.post(
    '/v0/admin/e_cheque/create_echeque_for_users',
    // authenticateToken,
    new EchequeCollection().createEcheque
  );
  app.get(
    '/v0/admin/user/user_list',
    // authenticateToken,
    new userCollection().getUserList
  );
};
