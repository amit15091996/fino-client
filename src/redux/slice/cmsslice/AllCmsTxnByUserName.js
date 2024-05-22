import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const allCmsTxnByUserNameService = createAsyncThunk("allCmsTxnByUserNameService", async(cms) => {

    return (await cms?.protectedInterceptors.get(`operation/get-all-cms-transaction/${cms?.mobileNumber}`))?.data
})

const allCmsTxnByUserNameSlice = createSlice({

    name: "allCmsTxnByUserNameSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(allCmsTxnByUserNameService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(allCmsTxnByUserNameService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(allCmsTxnByUserNameService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const GET_ALL_CMS_TXN_BY_USERNAME_SLICE_REDUCER = allCmsTxnByUserNameSlice.reducer