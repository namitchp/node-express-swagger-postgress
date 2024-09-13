module.exports = function () {
  //login
  /**
   * @openapi
   * components:
   *  schemas:
   *    UserLogin:
   *      type: object
   *      required:
   *        - mobile_no
   *        - country_code
   *      properties:
   *        mobile_no:
   *          type: string
   *          default: 1234567890
   *        country_code:
   *          type: string
   *          default: 91
   *    UserLoginResponse:
   *      type: object
   *      properties:
   *        mobile_no:
   *          type: string
   */
  /**
   * @openapi
   * /v0/user/login:
   *  post:
   *     tags:
   *     - User
   *     summary: Login user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserLogin'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/UserLoginResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  //otp Verify
  /**
   * @openapi
   * components:
   *  schemas:
   *    UserLoginOtp:
   *      type: object
   *      required:
   *        - mobile_no
   *        - otp
   *      properties:
   *        mobile_no:
   *          type: string
   *          default: 1234567890
   *        otp:
   *          type: string
   *          default: 3456
   *    UserLoginOtpResponse:
   *          type: object
   *          properties:
   *             mobile_no:
   *             type: string
   */
  /**
   * @openapi
   * /v0/user/otp_verify:
   *  post:
   *     tags:
   *     - User
   *     summary: Verify otp
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserLoginOtp'
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  //kyc
  /**
   * @openapi
   * components:
   *  schemas:
   *    UserKyc:
   *      type: object
   *      required:
   *        - name
   *        - dob
   *        - email
   *        - adhar_no
   *        - adhar_verified
   *        - pan_no
   *      properties:
   *        name:
   *          type: string
   *          default: Namit
   *        dob:
   *          type: date
   *          default: 12/12/1202
   *        email:
   *          type: string
   *          default: namitchp@gmail.com
   *        adhar_no:
   *          type: string
   *          default: 123456789012
   *        pan_no:
   *          type: string
   *          default: 123kjhpl3g
   */
  /**
   * @openapi
   * /v0/user/complete_user_detail:
   *  post:
   *     tags:
   *     - User
   *     summary: Complete Kyc
   *     security:
   *     - ApiKeyAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/UserKyc'
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  //upload Profile
  /**
   * @openapi
   * '/v0/user/update-user-profile':
   *  post:
   *     tags:
   *     - User
   *     summary: Upload Image or Update Image
   *     security:
   *     - ApiKeyAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            required:
   *              - profile_img
   *            properties:
   *              profile_img:
   *                type: string
   *     responses:
   *      200:
   *        description: Created
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   *
   */
  //add Account
  /**
   *
   * @openapi
   * '/v0/user/register_account_detail':
   *  post:
   *     tags:
   *     - User
   *     summary: Register Account Details
   *     security:
   *     - ApiKeyAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           type: object
   *           schema:
   *                properties:
   *                    bank_name:
   *                      type: string
   *                      default: sbi
   *                    ifsc:
   *                        type: string
   *                        default: 23456
   *                    branch_name:
   *                      type: string
   *                      default: rcc
   *                    branch_name_address:
   *                        type: string
   *                        default: new Delhi
   *                        required:
   *                    account_number:
   *                      type: string
   *                      default: 123457890
   *                    account_type:
   *                        type: string
   *                        default: saving
   *                        required:
   *
   *
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  /**
   *
   * @openapi
   * '/v0/user/user_profile_detail':
   *  get:
   *     tags:
   *     - User
   *     summary: User profile detail
   *     security:
   *     - ApiKeyAuth: []
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  /**
   * @openapi
   * '/v0/user/log_out':
   *  get:
   *     tags:
   *     - User
   *     summary: Log_out
   *     security:
   *     - ApiKeyAuth: []
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  /**
   * @openapi
   * '/v0/user/get_user_list_search':
   *  get:
   *     tags:
   *     - User
   *     summary: All User List
   *     security:
   *     - ApiKeyAuth: []
   *     parameters:
   *      - name: mobile_no
   *        in: query
   *        description: Mobile No
   *        default: 1
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description: Forbidden
   *       404:
   *         description:  not found
   */
  //wallet
  /**
   * @openapi
   * '/v0/wallet/createWalletPin':
   *  post:
   *     tags:
   *     - Wallet
   *     summary: Create Wallet pin
   *     security:
   *     - ApiKeyAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           type: object
   *           schema:
   *                properties:
   *                    wallet_pin:
   *                      type: integer
   *                      default: 234568
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  //create Transaction
  /**
   *
   * @openapi
   * '/v0/wallet/withdraw_and_deposite':
   *  post:
   *     tags:
   *     - Wallet
   *     summary: Create transaction deposit or withdraw
   *     security:
   *     - ApiKeyAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           type: object
   *           schema:
   *                properties:
   *                    type:
   *                      type: string
   *                      default: withdraw
   *                    wallet_address:
   *                      type: string
   *                      default: transfer amount throw mobile no
   *                    bank_id:
   *                      type: string
   *                      default: null
   *                    is_bank_transaction:
   *                        type: boolean
   *                        default: true
   *                        required:
   *                    amount:
   *                        type: number
   *                        default: 400
   *                        required:
   *                    source:
   *                        type: string
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  //   transaction list
  /**
   * @openapi
   * '/v0/transaction/get_transaction_list':
   *  get:
   *     tags:
   *     - Transaction
   *     summary: All Transaction List like Cheque or Wallet or All
   *     security:
   *     - ApiKeyAuth: []
   *     parameters:
   *      - name: page
   *        in: query
   *        description: Page No
   *        default: 1
   *        required: true
   *      - name: limit
   *        in: query
   *        default: 10
   *        description: Data Size
   *        required: true
   *      - name: type
   *        in: query
   *        default: All
   *        description: All or Wallet or Cheque
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description: Forbidden
   *       404:
   *         description:  not found
   */
  //get Wallet balance
  /**
   *
   * @openapi
   * '/v0/wallet/get_wallet_balance':
   *  get:
   *     tags:
   *     - Wallet
   *     summary: Wallet Balance
   *     security:
   *     - ApiKeyAuth: []
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  //echeque
  /**
   *
   * @openapi
   * '/v0/e_cheque/create_cheque_new':
   *  post:
   *     tags:
   *     - E-cheque
   *     summary: create Echeque Transaction
   *     security:
   *     - ApiKeyAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           type: object
   *           schema:
   *                properties:
   *                    inputmobileOrCheque:
   *                      type: string
   *                      default: Pm1234567890
   *                    amount:
   *                      type: number
   *                      default: 123
   *                      required: true
   *                    settlement_date:
   *                        type: date
   *                        default: 2023/12/02
   *                        required:
   *                    remarks:
   *                      type: string
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  /**
   *
   * @openapi
   * '/v0/e_cheque/reschedule_cheque':
   *  post:
   *     tags:
   *     - E-cheque
   *     summary: Echeque Transaction
   *     security:
   *     - ApiKeyAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           type: object
   *           schema:
   *                properties:
   *                    transaction_id:
   *                      type: string
   *                      default: null
   *                    remarks:
   *                      type: string
   *                    settlement_date:
   *                        type: date
   *                        default: 2023/12/02
   *                        required:
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  /**
   *
   * @openapi
   * '/v0/e_cheque/approve_cheque':
   *  post:
   *     tags:
   *     - E-cheque
   *     summary: Echeque Approve
   *     security:
   *     - ApiKeyAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           type: object
   *           schema:
   *                properties:
   *                    transaction_id:
   *                      type: string
   *                    status:
   *                      type: string
   *                      default: Approved or Reject
   *                    remarks:
   *                      type: string
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  //   transaction list
  //   /**
  //    * @openapi
  //    * '/v0/e_cheque/get_transaction_list':
  //    *  get:
  //    *     tags:
  //    *     - E-cheque
  //    *     summary: All Transaction List
  //    *     security:
  //    *     - ApiKeyAuth: []
  //    *     parameters:
  //    *      - name: page
  //    *        in: query
  //    *        description: Page No
  //    *        default: 1
  //    *        required: true
  //    *      - name: limit
  //    *        in: query
  //    *        default: 10
  //    *        description: Data Size
  //    *        required: true
  //    *      - name: search
  //    *        in: query
  //    *        description: search
  //    *     responses:
  //    *       200:
  //    *         description: Success
  //    *       403:
  //    *         description: Forbidden
  //    *       404:
  //    *         description:  not found
  //    */
  //Recive Or Send List
  /**
   * @openapi
   * '/v0/e_cheque/get_transaction_list_recive_and_send':
   *  get:
   *     tags:
   *     - E-cheque
   *     summary: All Transaction List Send and Recive
   *     security:
   *     - ApiKeyAuth: []
   *     parameters:
   *      - name: page
   *        in: query
   *        description: Page No
   *        default: 1
   *        required: true
   *      - name: limit
   *        in: query
   *        default: 10
   *        description: Data Size
   *        required: true
   *      - name: type
   *        in: query
   *        default: Send
   *        description: Send and Recive
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description: Forbidden
   *       404:
   *         description:  not found
   */
  //reschedule List
  /**
   * @openapi
   * '/v0/e_cheque/get_transaction_reschedule_list_recive_and_send':
   *  get:
   *     tags:
   *     - E-cheque
   *     summary: All Transaction List Send and Recive
   *     security:
   *     - ApiKeyAuth: []
   *     parameters:
   *      - name: page
   *        in: query
   *        description: Page No
   *        default: 1
   *        required: true
   *      - name: limit
   *        in: query
   *        default: 10
   *        description: Data Size
   *        required: true
   *      - name: type
   *        in: query
   *        default: Send
   *        description: Send and Recive
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description: Forbidden
   *       404:
   *         description:  not found
   */
  //get Wallet balance
  /**
   * @openapi
   * '/v0/e_cheque/get_cheque_balance':
   *  get:
   *     tags:
   *     - E-cheque
   *     summary: cheque Balance
   *     security:
   *     - ApiKeyAuth: []
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  //admin
  /**
   * @openapi
   * '/v0/admin/e_cheque/create_echeque_for_users':
   *  post:
   *     tags:
   *     - Admin
   *     summary: Create Cheque
   *     security:
   *     - ApiKeyAuth: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           type: object
   *           schema:
   *                properties:
   *                    user_id:
   *                      type: string
   *                      default: null
   *                    mobile_no:
   *                      type: string
   *                      default: ""
   *                    monthly_amount_limit:
   *                        type: number
   *                        default: 500
   *                    is_blocked:
   *                        type: boolean
   *                        default: false
   *                    is_deleted:
   *                        type: boolean
   *                        default: false
   *     responses:
   *      200:
   *        description: Success
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  /**
   * @openapi
   * '/v0/admin/user/user_list':
   *  get:
   *     tags:
   *     - Admin
   *     summary: All Transaction List
   *     security:
   *     - ApiKeyAuth: []
   *     parameters:
   *      - name: page
   *        in: query
   *        description: Page No
   *        default: 1
   *        required: true
   *      - name: limit
   *        in: query
   *        default: 10
   *        description: Data Size
   *        required: true
   *      - name: search
   *        in: query
   *        description: search
   *     responses:
   *       200:
   *         description: Success
   *       403:
   *         description: Forbidden
   *       404:
   *         description:  not found
   */
};
