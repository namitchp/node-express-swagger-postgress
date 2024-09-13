import Utils from '../../utils';
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from '../../common/constants';
import model from '../../models';
export default class Manager {
  createEcheque = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let {
      monthly_amount_limit,
      cheque_id,
      mobile_no,
      user_id,
      is_blocked,
      is_deleted,
    } = req;
    if (!cheque_id) {
      const cheque = await model.v0_cheques.findOne({
        where: { cheque_address: mobile_no },
      });
      if (cheque) {
        return Utils.error(
          'Cheque Already Exists',
          httpConstants.RESPONSE_STATUS.FAILURE,
          httpConstants.RESPONSE_CODES.BAD_REQUEST
        );
      }
      const insertCheque = await model.v0_cheques.create({
        user_id,
        monthly_amount_limit,
        cheque_address: mobile_no,
        cheque_address: mobile_no,
      });
      return insertCheque;
    } else {
      await model.v0_cheques.update(
        {
          monthly_amount_limit,
          is_blocked,
          is_deleted,
          cheque_address: mobile_no,
        },
        {
          where: { cheque_id: cheque_id },
        }
      );
      return { user_id, monthly_amount_limit, cheque_id };
    }
  };
  createChequeTransaction = async (req, user_id) => {
    if (!req && !user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let { inputmobileOrCheque, amount, settlement_date, remarks } = req;
    // const cheque = await model.v0_cheques.findOne({
    //   where: { user_id },
    // });
    const [cheque, metadata] = await model.sequelize.query(`
      select c.* ,u."name",u.mobile_no from v0_cheques c
      inner join v0_users u on u.user_id=c.user_id
      where c.user_id='${user_id}'`);
    console.log(cheque);
    console.log(user_id);
    if (!cheque.length > 0) {
      return Utils.error(
        'E-cheque not Exist',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    }
    const amountLimit = cheque[0].monthly_amount_limit;
    if (amountLimit < amount) {
      return Utils.error(
        'Insufficient Cheque Balance',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    }
    // const senderChequeDetail = await model.v0_cheques.findOne({
    //   where: {
    //     [model.Sequelize.Op.or]: [
    //       { cheque_address: inputmobileOrCheque },
    //       { cheque_no: inputmobileOrCheque },
    //     ],
    //   },
    // });
    const [senderChequeDetail, metadataSender] = await model.sequelize.query(
      `select c.* ,u."name",u.mobile_no from v0_cheques c
        inner join v0_users u on u.user_id=c.user_id
        where c.cheque_address='${inputmobileOrCheque}' or c.cheque_no='${inputmobileOrCheque}'`
    );
    if (!senderChequeDetail.length > 0) {
      return Utils.error(
        'Sender has not E_Cheque ',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    }
    if (cheque[0].cheque_id == senderChequeDetail[0].cheque_id) {
      return Utils.error(
        'Same Cheque',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.BAD_REQUEST
      );
    }

    const transaction = await model.v0_transactions.create({
      from_cheque_id: cheque[0].cheque_id,
      to_cheque_id: senderChequeDetail[0].cheque_id,
      user_id,
      amount,
      settlement_date,
      transaction_type: 'Cheque',
      remarks,
    });
    await model.v0_cheques.update(
      {
        monthly_amount_limit: +amountLimit - amount,
      },
      {
        where: {
          user_id,
        },
      }
    );
    await model.v0_cheques.update(
      {
        monthly_amount_limit:
          +senderChequeDetail[0].monthly_amount_limit + amount,
      },
      {
        where: {
          cheque_id: senderChequeDetail[0].cheque_id,
        },
      }
    );
    // console.log(transaction.v0_transactions)
    return {
      status: transaction.status,
      transaction_id: transaction.transaction_id,
      from_cheque_id: transaction.from_cheque_id,
      to_cheque_id: transaction.to_cheque_id,
      amount: transaction.amount,
      settlement_date: transaction.settlement_date,
      user_id: transaction.user_id,
      s_user_name: cheque[0].name,
      s_user_mobile_no: cheque[0].mobile_no,
      r_user_name: senderChequeDetail[0].name,
      r_user_mobile_no: senderChequeDetail[0].mobile_no,
    };
  };
  getTransactionListSendAndRecive = async (req, user_id) => {
    if (!req && !user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const page = req.page || 1;
    const limit = req.limit || 10;
    const offset = (page - 1) * limit;
    const type = req.type || 'Send';
    const cheque = await model.v0_cheques.findOne({ where: { user_id } });
    if (!cheque) {
      return Utils.error(
        "Cheque dose't exist",
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    console.log(type);
    if (type == 'Recive') {
      // const result = await model.v0_transactions.findAndCountAll({
      //   where: {
      //     transaction_type: 'Cheque',
      //     to_cheque_id: cheque.cheque_id,
      //     transaction_no: null,
      //   },
      //   order: [['createdAt', 'DESC']],
      //   offset,
      //   limit,
      // });
      const [results, metadata] = await model.sequelize.query(`
        SELECT t.*,u."name" as r_user_name,u.mobile_no as r_user_mobile_no,su."name" as s_user_name ,su.mobile_no as s_user_mobile_no from v0_transactions t
         INNER join v0_cheques c ON c.cheque_id = t.to_cheque_id
         INNER join v0_users u ON u.user_id = c.user_id
         INNER join v0_users su ON su.user_id = t.user_id
         WHERE transaction_type= 'Cheque' AND to_cheque_id= '${cheque.cheque_id}' AND transaction_no IS NULL
          ORDER BY t."createdAt" DESC 
         limit '${limit}' offset '${offset}'
        `);
      return {
        pagination: {
          current_page: page,
          limit,
          // total_page: Math.ceil(+result.count / limit),
        },
        data: results,
      };
    } else {
      // const result = await model.v0_transactions.findAndCountAll({
      //   where: {
      //     user_id,
      //     transaction_type: 'Cheque',
      //     transaction_no: null,
      //   },
      //   order: [['createdAt', 'DESC']],
      //   offset,
      //   limit,
      // });
      console.log(limit);
      console.log(offset);
      const [results, metadata] = await model.sequelize.query(`
        SELECT t.*,u."name" as r_user_name,u.mobile_no as r_user_mobile_no,su."name" as s_user_name ,su.mobile_no as s_user_mobile_no from v0_transactions t
         INNER join v0_cheques c ON c.cheque_id = t.to_cheque_id
         INNER join v0_users u ON u.user_id = c.user_id
         INNER join v0_users su ON su.user_id = t.user_id
         WHERE t.transaction_type= 'Cheque' AND t.transaction_no IS NULL AND t.user_id= '${user_id}'
          ORDER BY t."createdAt" DESC 
         limit '${limit}' offset '${offset}'
        `);
      return {
        pagination: {
          current_page: page,
          limit,
          // total_page: Math.ceil(+result.count / limit),
        },
        data: results,
      };
    }
  };
  getTransactionListReschedule = async (req, user_id) => {
    if (!req && !user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const page = req.page || 1;
    const limit = req.limit || 10;
    const offset = (page - 1) * limit;
    const type = req.type || 'Send';
    const cheque = await model.v0_cheques.findOne({ where: { user_id } });
    if (!cheque) {
      return Utils.error(
        "Cheque dose't exist",
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    console.log(type);
    console.log(cheque);
    if (type == 'Recive') {
      // const result = await model.v0_transactions.findAndCountAll({
      //   where: {
      //     transaction_type: 'Cheque',
      //     to_cheque_id: cheque.cheque_id,
      //     reschedule_status: 'Reschedule',
      //     latest_Cheque: true,
      //   },
      //   order: [['createdAt', 'DESC']],
      //   offset,
      //   limit,
      // });
      const [results, metadata] = await model.sequelize.query(`
        SELECT t.*,u."name" as r_user_name,u.mobile_no as r_user_mobile_no,su."name" as s_user_name ,su.mobile_no as s_user_mobile_no from v0_transactions t
         INNER join v0_cheques c ON c.cheque_id = t.to_cheque_id
         INNER join v0_users u ON u.user_id = c.user_id
         INNER join v0_users su ON su.user_id = t.user_id
         WHERE t.transaction_type= 'Cheque' AND t.to_cheque_id= '${cheque.cheque_id}' AND t.reschedule_status= 'Reschedule' AND t."latest_Cheque"=true
          ORDER BY t."createdAt" DESC 
         limit '${limit}' offset '${offset}'
        `);
      return {
        pagination: {
          current_page: page,
          limit,
          // total_page: Math.ceil(+result.count / limit),
        },
        data: results,
      };
    } else {
      // const result = await model.v0_transactions.findAndCountAll({
      //   where: {
      //     user_id,
      //     transaction_type: 'Cheque',
      //     reschedule_status: 'Reschedule',
      //     latest_Cheque: true,
      //   },
      //   order: [['createdAt', 'DESC']],
      //   offset,
      //   limit,
      // });
      const [results, metadata] = await model.sequelize.query(`
        SELECT t.*,u."name" as r_user_name,u.mobile_no as r_user_mobile_no,su."name" as s_user_name ,su.mobile_no as s_user_mobile_no from v0_transactions t
         INNER join v0_cheques c ON c.cheque_id = t.to_cheque_id
         INNER join v0_users u ON u.user_id = c.user_id
         INNER join v0_users su ON su.user_id = t.user_id
         WHERE t.transaction_type= 'Cheque' AND t.user_id= '${user_id}' AND t.reschedule_status= 'Reschedule' AND t."latest_Cheque"=true
         ORDER BY t."createdAt" DESC 
         limit '${limit}' offset '${offset}'
        `);
      return {
        pagination: {
          current_page: page,
          limit,
          // total_page: Math.ceil(+result.count / limit),
        },
        data: results,
      };
    }
  };
  getChequeBalance = async (user_id) => {
    if (!user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const chequBalance = await model.v0_cheques.findOne({
      where: { user_id: user_id },
    });
    if (!chequBalance) {
      return { is_created: false, message: 'E-cheque is not created' };
    }
    return chequBalance;
  };
  reseduleCheque = async (req, user_id) => {
    if (!user_id) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const { transaction_id, settlement_date, remarks } = req;
    const chequeTransaction = await model.v0_transactions.findOne({
      where: { transaction_id, user_id },
    });
    if (!chequeTransaction) {
      return Utils.error(
        ' Cheque Transaction not Found',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    // await model.v0_transactions.update(
    //   { status: 'Reschedule',remarks:remarks ,latest_Cheque:false,},
    //   {
    //     where: {transaction_id},
    //   }
    // );
    const taranasction = await model.v0_transactions.create({
      from_cheque_id: chequeTransaction.from_cheque_id,
      transaction_no: chequeTransaction.transaction_no
        ? chequeTransaction.transaction_no
        : transaction_id,
      to_cheque_id: chequeTransaction.to_cheque_id,
      user_id,
      amount: chequeTransaction.amount,
      settlement_date: chequeTransaction.settlement_date,
      reschedule_settlement_date: settlement_date,
      latest_Cheque: true,
      transaction_type: 'Cheque',
      remarks: remarks,
      revision: +chequeTransaction.revision + 1,
      status: 'Pending',
      reschedule_status: 'Reschedule',
    });
    return taranasction;
    // return {
    //   transaction_id,
    //   settlement_date,
    // };
  };
  chequeApproved = async (req, user) => { 
    if (!req && !user) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const cheque = await model.v0_cheques.findOne({
      where: { user_id: user.user_id },
    });
    if (!cheque) {
      return Utils.error(
        ' Cheque  not Found',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const { transaction_id, status, remarks } = req;
    const chequeTransactionDetail = await model.v0_transactions.findOne({
      where: {
        transaction_id,
        to_cheque_id: cheque.cheque_id,
        latest_Cheque: true,
      },
    });
    if (!chequeTransactionDetail) {
      return Utils.error(
        'Reschedule Cheque Transaction not Found',
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    // const chequeDetail = await model.v0_cheques.findOne({
    //   where: { cheque_address: chequeTransactionDetail.to_cheque_id },
    // });
    // if (!chequeDetail) {
    //   return Utils.error(
    //     ' Cheque not Found',
    //     httpConstants.RESPONSE_STATUS.FAILURE,
    //     httpConstants.RESPONSE_CODES.FORBIDDEN
    //   );
    // }
    if (status === 'Approved') {
      await model.v0_transactions.update(
        {
          settlement_date: chequeTransactionDetail.reschedule_settlement_date,
          remarks,
        },
        {
          where: {
            transaction_id: chequeTransactionDetail.transaction_no,
            to_cheque_id: cheque.cheque_id,
            transaction_no: null,
          },
        }
      );

      await model.v0_transactions.update(
        { reschedule_status: 'Pending', remarks },
        {
          where: {
            transaction_id,
            to_cheque_id: cheque.cheque_id,
            latest_Cheque: true,
          },
        }
      );
      return {
        transaction_id,
        transaction_no: chequeTransactionDetail.transaction_no,
        status: 'Pending',
      };
    }
    if (status === 'Reject') {
      await model.v0_transactions.update(
        {
          settlement_date: chequeTransactionDetail.reschedule_settlement_date,
          remarks,
        },
        {
          where: {
            transaction_id: chequeTransactionDetail.transaction_no,
            to_cheque_id: cheque.cheque_id,
            cheque_no: null,
          },
        }
      );
      await model.v0_transactions.update(
        { reschedule_status: 'Reject', remarks },
        {
          where: {
            transaction_id,
            to_cheque_id: cheque.cheque_id,
            latest_Cheque: true,
          },
        }
      );
      return {
        transaction_id,
        status: 'Reject',
      };
    }
    // await model.v0_cheques.update(
    //   {
    //     monthly_amount_limit:
    //       +chequeDetail.monthly_amount_limit +
    //       Number(chequeTransactionDetail.amount),
    //   },
    //   { where: { cheque_id: chequeTransactionDetail.to_cheque_id } }
    // );
    return Utils.error(
      '',
      httpConstants.RESPONSE_STATUS.FAILURE,
      httpConstants.RESPONSE_CODES.FORBIDDEN
    );
  };
}
