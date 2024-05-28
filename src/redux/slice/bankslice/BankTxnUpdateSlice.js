import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateBankTxnService = createAsyncThunk("updateBankTxnService", async(updateBankTxn) => {


    return (await updateBankTxn?.protectedInterceptors.put(`operation/update-bank-transaction/${updateBankTxn?.bankTxnId}`,updateBankTxn?.payload))?.data
})

const updateBankTxnSlice = createSlice({

    name: "updateBankTxnSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(updateBankTxnService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(updateBankTxnService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(updateBankTxnService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const UPDATE_BANK_TXN_SLICE_REDUCER = updateBankTxnSlice.reducer