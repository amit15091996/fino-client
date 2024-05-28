import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteCmsTxnService = createAsyncThunk("deleteCmsTxnService", async(deleteCmsTxn) => {


    return (await deleteCmsTxn?.protectedInterceptors.delete(`operation/delete-cms-transaction/${deleteCmsTxn?.cmsTxnId}`))?.data
})

const deleteCmsTxnSlice = createSlice({

    name: "deleteCmsTxnSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(deleteCmsTxnService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(deleteCmsTxnService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(deleteCmsTxnService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const DELETE_CMS_TXN_SLICE_REDUCER = deleteCmsTxnSlice.reducer