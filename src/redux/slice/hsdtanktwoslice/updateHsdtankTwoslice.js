import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateHsdTankTwoReportService = createAsyncThunk("updateHsdTankTwoReportService", async (hsdTwo) => {

    return (await hsdTwo?.protectedInterceptors.put(`fuel-report/update-hsd-tank-two-reports/${hsdTwo?.hsdSaleTwoId}`, hsdTwo?.payload))?.data
})

const updateHsdTankTwoReportSlice = createSlice({

    name: "updateHsdTankTwoReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(updateHsdTankTwoReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
                state.error = action.error
        });
        builder.addCase(updateHsdTankTwoReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload,
                state.error = action.error
        });
        builder.addCase(updateHsdTankTwoReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error = action.error
        });
    },

}

)
export const UPDATE_HSD_TWO_SLICE_REDUCER = updateHsdTankTwoReportSlice.reducer