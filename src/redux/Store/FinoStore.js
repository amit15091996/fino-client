import { configureStore } from '@reduxjs/toolkit'
import { LOGIN_SLICE_REDUCER } from '../slice/userslice/LoginSlice'
import { REGISTER_SLICE_REDUCER } from '../slice/userslice/RegisterSlice'
import { GET_ALL_USERS_SLICE_REDUCER } from '../slice/userslice/AllUserSlice'

const FinoStore = configureStore({
    reducer:{
      LOGIN_SLICE_REDUCER:LOGIN_SLICE_REDUCER,
      REGISTER_SLICE_REDUCER:REGISTER_SLICE_REDUCER,
      GET_ALL_USERS_SLICE_REDUCER:GET_ALL_USERS_SLICE_REDUCER  

    },
    devTools:true

})
  


export default FinoStore