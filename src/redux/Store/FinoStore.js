import { configureStore } from '@reduxjs/toolkit'
import { LOGIN_SLICE_REDUCER } from '../slice/userslice/LoginSlice'
import { REGISTER_SLICE_REDUCER } from '../slice/userslice/RegisterSlice'
import { GET_ALL_USERS_SLICE_REDUCER } from '../slice/userslice/AllUserSlice'
import { BANK_DEPOSIT_SLICE_REDUCER } from '../slice/bankslice/BankDepositSlice'
import { CMS_TRANSACTION_SLICE_REDUCER } from '../slice/cmsslice/CmsTransactionSlice'
import { GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER } from '../slice/bankslice/AllBankDepositByUserName'
import { GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER } from '../slice/cmsslice/AllCmsTxnByUserName'
import { FORGOT_PASSWORD_SLICE_REDUCER } from '../slice/userslice/ForgotPasswordSlice'
import { RESET_PASSWORD_SLICE_REDUCER } from '../slice/userslice/ResetPasswordSlice'
import { BANK_TXN_SEARCH_SLICE_REDUCER } from '../slice/bankslice/BankTxnSearchSlice'
import { CMS_TXN_SEARCH_SLICE_REDUCER } from '../slice/cmsslice/CmsTxnSearchSlice'
import { DISABLE_USER_SLICE_REDUCER } from '../slice/userslice/DisableUserSlice'
import { UPDATE_USER_SLICE_REDUCER } from '../slice/userslice/UpdateUserSlice'
import { ASSIGN_ROLE_SLICE_REDUCER } from '../slice/userslice/AssignAnRoleSlice'
import { DELETE_ROLE_SLICE_REDUCER } from '../slice/userslice/DeleteAnRole'
import { UPDATE_BANK_TXN_SLICE_REDUCER } from '../slice/bankslice/BankTxnUpdateSlice'
import { DELETE_BANK_TXN_SLICE_REDUCER } from '../slice/bankslice/BankTxnDeleteSlice'
import { UPDATE_CMS_TXN_SLICE_REDUCER } from '../slice/cmsslice/CmsTxnUpdateSlice'
import { DELETE_CMS_TXN_SLICE_REDUCER } from '../slice/cmsslice/CmsTxnDeleteSlice'
import { ADD_CLIENT_SLICE_REDUCER } from '../slice/clientslice/addClients'
import { DELETE_CLIENT_SLICE_REDUCER } from '../slice/clientslice/deleteAClient'
import { GET_ALL_CLIENTS_SLICE_REDUCER } from '../slice/clientslice/getAllClients'

const FinoStore = configureStore({
    reducer:{
      LOGIN_SLICE_REDUCER:LOGIN_SLICE_REDUCER,
      REGISTER_SLICE_REDUCER:REGISTER_SLICE_REDUCER,
      GET_ALL_USERS_SLICE_REDUCER:GET_ALL_USERS_SLICE_REDUCER,
      BANK_DEPOSIT_SLICE_REDUCER:BANK_DEPOSIT_SLICE_REDUCER,
      CMS_TRANSACTION_SLICE_REDUCER:CMS_TRANSACTION_SLICE_REDUCER,
      GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER:GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER,
      GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER:GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER,
      FORGOT_PASSWORD_SLICE_REDUCER:FORGOT_PASSWORD_SLICE_REDUCER,
      RESET_PASSWORD_SLICE_REDUCER:RESET_PASSWORD_SLICE_REDUCER,
      BANK_TXN_SEARCH_SLICE_REDUCER:BANK_TXN_SEARCH_SLICE_REDUCER,
      CMS_TXN_SEARCH_SLICE_REDUCER:CMS_TXN_SEARCH_SLICE_REDUCER,
      DISABLE_USER_SLICE_REDUCER:DISABLE_USER_SLICE_REDUCER,
      UPDATE_USER_SLICE_REDUCER:UPDATE_USER_SLICE_REDUCER,
      ASSIGN_ROLE_SLICE_REDUCER:ASSIGN_ROLE_SLICE_REDUCER,
      DELETE_ROLE_SLICE_REDUCER:DELETE_ROLE_SLICE_REDUCER,
      UPDATE_BANK_TXN_SLICE_REDUCER:UPDATE_BANK_TXN_SLICE_REDUCER,
      DELETE_BANK_TXN_SLICE_REDUCER:DELETE_BANK_TXN_SLICE_REDUCER,
      UPDATE_CMS_TXN_SLICE_REDUCER:UPDATE_CMS_TXN_SLICE_REDUCER,
      DELETE_CMS_TXN_SLICE_REDUCER:DELETE_CMS_TXN_SLICE_REDUCER,
      ADD_CLIENT_SLICE_REDUCER:ADD_CLIENT_SLICE_REDUCER, 
      DELETE_CLIENT_SLICE_REDUCER:DELETE_CLIENT_SLICE_REDUCER,
      GET_ALL_CLIENTS_SLICE_REDUCER:GET_ALL_CLIENTS_SLICE_REDUCER,
    },
    devTools:true

})
  


export default FinoStore