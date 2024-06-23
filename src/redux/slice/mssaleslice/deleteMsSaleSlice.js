import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteMsSaleReportService = createAsyncThunk("deleteMsSaleReportService", async(deleteMsSale) => {

    return (await deleteMsSale?.protectedInterceptors.delete(`fuel-report/delete-a-mssale-reports/${deleteMsSale?.msSaleId}`))?.data
})

const deleteMsSaleReportSlice = createSlice({

    name: "deleteMsSaleReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(deleteMsSaleReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(deleteMsSaleReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(deleteMsSaleReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const DELETE_MS_SALE_SLICE_REDUCER = deleteMsSaleReportSlice.reducer