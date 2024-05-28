import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteBankTxnService = createAsyncThunk("deleteBankTxnService", async(deleteBankTxn) => {


    return (await deleteBankTxn?.protectedInterceptors.delete(`operation/delete-bank-transaction/${deleteBankTxn?.bankTxnId}`))?.data
})

const deleteBankTxnSlice = createSlice({

    name: "deleteBankTxnSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(deleteBankTxnService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(deleteBankTxnService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(deleteBankTxnService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const DELETE_BANK_TXN_SLICE_REDUCER = deleteBankTxnSlice.reducer