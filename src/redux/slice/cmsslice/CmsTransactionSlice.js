import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const cmsTransactionService = createAsyncThunk("cmsTransactionService", async(cmsTransaction) => {

    return (await cmsTransaction?.protectedInterceptors.post(`operation/insert-cms-transaction`,cmsTransaction?.payload))?.data
})

const cmsTransactionSlice = createSlice({

    name: "cmsTransactionSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(cmsTransactionService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(cmsTransactionService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(cmsTransactionService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const CMS_TRANSACTION_SLICE_REDUCER = cmsTransactionSlice.reducer