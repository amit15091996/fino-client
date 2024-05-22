import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const bankDepositService = createAsyncThunk("bankDepositService", async(bankDeposit) => {

    return (await bankDeposit?.protectedInterceptors.post(`operation/insert-bank-transaction`,bankDeposit?.payload))?.data
})

const bankDepositSlice = createSlice({

    name: "bankDepositSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(bankDepositService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(bankDepositService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(bankDepositService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const BANK_DEPOSIT_SLICE_REDUCER = bankDepositSlice.reducer