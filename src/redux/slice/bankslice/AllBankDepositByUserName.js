import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const allBankDepositByUserNameService = createAsyncThunk("allBankDepositByUserNameService", async(deposit) => {

    return (await deposit?.protectedInterceptors.get(`operation/get-all-bank-transaction/${deposit?.mobileNumber}`))?.data
})

const allBankDepositByUserNameSlice = createSlice({

    name: "allBankDepositByUserNameSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(allBankDepositByUserNameService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(allBankDepositByUserNameService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(allBankDepositByUserNameService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const GET_ALL_BANK_DEPOSIT_BY_USERNAME_SLICE_REDUCER = allBankDepositByUserNameSlice.reducer