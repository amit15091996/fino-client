import { configureStore } from '@reduxjs/toolkit'
import { LOGIN_SLICE_REDUCER } from '../slice/userslice/LoginSlice'

const FinoStore = configureStore({
    reducer:{
      LOGIN_SLICE_REDUCER:LOGIN_SLICE_REDUCER  

    },
    devTools:true

})
  


export default FinoStore