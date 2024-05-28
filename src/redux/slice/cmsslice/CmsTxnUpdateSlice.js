import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateCmsTxnService = createAsyncThunk("updateCmsTxnService", async(updateCmsTxn) => {


    return (await updateCmsTxn?.protectedInterceptors.put(`operation/update-cms-transaction/${updateCmsTxn?.cmsTxnId}`,updateCmsTxn?.payload))?.data
})

const updateCmsTxnSlice = createSlice({

    name: "updateCmsTxnSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(updateCmsTxnService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(updateCmsTxnService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(updateCmsTxnService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const UPDATE_CMS_TXN_SLICE_REDUCER = updateCmsTxnSlice.reducer