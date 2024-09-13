import Utils from '../../utils';
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from '../../common/constants';
import { Message } from 'twilio/lib/twiml/MessagingResponse';
import model from '../../models'
export default class Manager {
  createWalletPin = async (req, user_id) => {
    if (!req && !user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let { wallet_pin } = req;
    const wallet = await model.v0_wallets.findOne({ where: { user_id: user_id } });
    if (!wallet) {
      return Utils.error(
        'Wallet Already Exists',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    }
    await model.v0_wallets.update(
      {
        wallet_pin,
      },
      {
        where: {
          user_id: user_id,
        },
      }
    );
    return {
      Message: 'Wallet pin generated successfully',
      wallet_id: wallet.wallet_id,
    };
  };
  createTransaction = async (req, user_id) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let { wallet_address, bank_id, is_bank_transaction, amount, type,source } = req;
    const wallet = await model.v0_wallets.findOne({
      where: { user_id },
    });
    if (!wallet) {
      return Utils.error(
        'Transaction Add Wallet Not Exists',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    }
    if (type === 'withdraw' && wallet.balance < amount) {
      return Utils.error(
        'Insufficient Balance',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    }
    if (type === 'deposit') {
      const transaction = await model.v0_transactions.create({
        user_id,
        from_wallet_id: wallet.wallet_id,
        bank_id,
        is_bank_transaction,
        transaction_has: new Date().valueOf(),
        amount,
        status: 'Success',
        transaction_status: true,
        wallet_type:'deposit',
        transaction_type: 'Wallet',
        transaction_date: new Date(),
        source
      });
      await model.v0_wallets.update(
        {
          balance: Number(wallet.balance) + Number(amount),
        },
        {
          where: {
            wallet_id: wallet.wallet_id,
          },
        }
      );
      return transaction;
    }
    if (type === 'withdraw' && !wallet_address) {
      const transaction = await model.v0_transactions.create({
        user_id,
        from_wallet_id: wallet.wallet_id,
        // to_wallet_id: to_wallet.wallet_id,
        bank_id,
        is_bank_transaction,
        transaction_has: new Date().valueOf(),
        amount,
        status: 'Success',
        transaction_status: true,
        wallet_type:'withdraw',
        transaction_type: 'Wallet',
        transaction_date: new Date(),
        source
      });
      await model.v0_wallets.update(
        {
          balance: +wallet.balance - Number(amount),
        },
        {
          where: {
            wallet_id: wallet.wallet_id,
          },
        }
      );
      return transaction;
    }
    const to_wallet = await model.v0_wallets.findOne({
      where: { wallet_address: wallet_address },
    });

    if (to_wallet) {
      if (+wallet.wallet_id == to_wallet.wallet_id) {
        return Utils.error(
          'Same Wallet',
          httpConstants.RESPONSE_STATUS.FAILURE,
          httpConstants.RESPONSE_CODES.BAD_REQUEST
        );
      }
    } else {
      return Utils.error(
        'Transaction Transfer Wallet Not Exists',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    }
    if (type === 'withdraw') {
      const transaction = await model.v0_transactions.create({
        user_id,
        from_wallet_id: wallet.wallet_id,
        to_wallet_id: to_wallet.wallet_id,
        bank_id,
        is_bank_transaction,
        transaction_has: new Date().valueOf(),
        amount,
        status: 'Success',
        transaction_status: true,
        wallet_type:'withdraw',
        transaction_type: 'Wallet',
        transaction_date: new Date(),
        source
      });
      await model.v0_wallets.update(
        {
          balance: +wallet.balance - Number(amount),
        },
        {
          where: {
            wallet_id: wallet.wallet_id,
          },
        }
      );
      await model.v0_wallets.update(
        {
          balance: Number(to_wallet.balance) + Number(amount),
        },
        {
          where: {
            wallet_id: to_wallet.wallet_id,
          },
        }
      );
      return transaction;
    }
  };
  getTransactionList = async (req, user) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const page = req.page || 1;
    const limit = req.limit || 10;
    const offset = (page - 1) * limit;
    const type = req.type || 'All';
    const id =
      type !== 'Wallet'
        ? await model.v0_cheques.findOne({ where: { user_id:user.user_id } })
        : null;
    function query(value) {
      switch (value) {
        case 'Wallet':
          return {
            where: {
              transaction_type: type,
              [model.Sequelize.Op.or]: [
                { from_wallet_id: user.wallet_id },
                { to_wallet_id: user.wallet_id },
              ],
            },
            attributes: [
              'transaction_id',
              'to_wallet_id',
              'user_id',
              'from_wallet_id',
              'is_bank_transaction',
              'source',
              'transaction_has',
              'amount',
              'transaction_date',
              'status',
              'createdAt',
              'updatedAt',
              [
                model.Sequelize.literal(
                  `CASE WHEN to_wallet_id =' ${user.wallet_id}' THEN 'deposit' ELSE wallet_type END`
                ),
                'type',
              ],
            ],
            order: [['createdAt', 'DESC']],
            offset: offset,
            limit: limit,
          };
          break;
        case 'Cheque':
          return {
            where: {
              transaction_type: type,
              transaction_no: null,
              [model.Sequelize.Op.or]: [
                { from_cheque_id: id.cheque_id },
                { to_cheque_id: id.cheque_id },
              ],
            },
            attributes: [
              'transaction_id',
              'from_cheque_id',
              'user_id',
              'to_cheque_id',
              'amount',
              'settlement_date',
              'transaction_date',
              'is_satteld',
              'transaction_type',
              'source',
              'remarks',
              'status',
              'is_bank_transaction',
              'createdAt',
              'updatedAt',
              [
                model.Sequelize.literal(
                  `CASE WHEN to_cheque_id = '${id.cheque_id}' THEN 'Recive' ELSE 'Send' END`
                ),
                'type',
              ],
              [model.Sequelize.literal(`true`), 'is_bank_transaction'],
            ],
            order: [['createdAt', 'DESC']],
            offset: offset,
            limit: limit,
          };
          break;
        default:
          return {
            where: {
              transaction_no: null,
              [model.Sequelize.Op.or]: [
                { from_wallet_id: user.wallet_id },
                { to_wallet_id: user.wallet_id },
                { from_cheque_id: id.cheque_id },
                { to_cheque_id: id.cheque_id },
              ],
            },
            attributes: [
              'transaction_id',
              'to_wallet_id',
              'user_id',
              'from_wallet_id',
              'transaction_has',
              'from_cheque_id',
              'to_cheque_id',
              'amount',
              'settlement_date',
              'transaction_date',
              'is_satteld',
              'transaction_type',
              'status',
              'is_bank_transaction',
              'createdAt',
              'updatedAt',
              [
                model.Sequelize.literal(
                  `CASE WHEN to_wallet_id='${user.wallet_id}' then 'deposit' WHEN to_cheque_id='${id.cheque_id}' then 'Recive' WHEN from_cheque_id='${id.cheque_id}' then 'Add'   else wallet_type  end`
                ),
                'type',
              ],
            ],
            order: [['createdAt', 'DESC']],
            offset: offset,
            limit: limit,
          };
      }
    }
    const result = await model.v0_transactions.findAndCountAll(query(type));
    return  result.rows.length>0?{
      pagination: {
        valid:true,
        message:"Data Available",
        current_page: page,
        limit,
        total_page: Math.ceil(+result.count / limit),
      },
      data: result.rows,
    }:{
      pagination: {
        valid:false,
        message:" Data Not Available",
        current_page: page,
        limit,
        total_page: Math.ceil(+result.count / limit),
      },
      data: result.rows,
    };
  };
  getWalletBalance = async (user_id) => {
    if (!user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return await model.v0_wallets.findOne({ where: { user_id: user_id } });
  };
}
