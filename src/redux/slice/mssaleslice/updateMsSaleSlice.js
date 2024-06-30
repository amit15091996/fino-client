import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateMsSaleReportService = createAsyncThunk("updateMsSaleReportService", async (msSale) => {

    return (await msSale?.protectedInterceptors.put(`fuel-report/update-mssale-reports/${msSale?.msSaleId}`, msSale?.payload))?.data
})

const updateMsSaleReportSlice = createSlice({

    name: "updateMsSaleReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(updateMsSaleReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
                state.error = action.error
        });
        builder.addCase(updateMsSaleReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload,
                state.error = action.error
        });
        builder.addCase(updateMsSaleReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error = action.error
        });
    },

}

)
export const UPDATE_MS_SALE_SLICE_REDUCER = updateMsSaleReportSlice.reducer