import { configureStore } from '@reduxjs/toolkit'
import { LOGIN_SLICE_REDUCER } from '../slice/userslice/LoginSlice'
import { REGISTER_SLICE_REDUCER } from '../slice/userslice/RegisterSlice'
import { GET_ALL_USERS_SLICE_REDUCER } from '../slice/userslice/AllUserSlice'
import { BANK_DEPOSIT_SLICE_REDUCER } from '../slice/bankslice/BankDepositSlice'
import { CMS_TRANSACTION_SLICE_REDUCER } from '../slice/cmsslice/CmsTransactionSlice'
import { GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER } from '../slice/bankslice/AllBankDepositByUserName'
import { GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER } from '../slice/cmsslice/AllCmsTxnByUserName'

const FinoStore = configureStore({
    reducer:{
      LOGIN_SLICE_REDUCER:LOGIN_SLICE_REDUCER,
      REGISTER_SLICE_REDUCER:REGISTER_SLICE_REDUCER,
      GET_ALL_USERS_SLICE_REDUCER:GET_ALL_USERS_SLICE_REDUCER,
      BANK_DEPOSIT_SLICE_REDUCER:BANK_DEPOSIT_SLICE_REDUCER,
      CMS_TRANSACTION_SLICE_REDUCER:CMS_TRANSACTION_SLICE_REDUCER,
      GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER:GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER,
      GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER:GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER  

    },
    devTools:true

})
  


export default FinoStore