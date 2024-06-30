import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateHsdTankOneReportService = createAsyncThunk("updateHsdTankOneReportService", async (hsdOne) => {

    return (await hsdOne?.protectedInterceptors.put(`fuel-report/update-hsd-tank-one-reports/${hsdOne?.hsdSaleOneId}`, hsdOne?.payload))?.data
})

const updateHsdTankOneReportSlice = createSlice({

    name: "updateHsdTankOneReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(updateHsdTankOneReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
                state.error = action.error
        });
        builder.addCase(updateHsdTankOneReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload,
                state.error = action.error
        });
        builder.addCase(updateHsdTankOneReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error = action.error
        });
    },

}

)
export const UPDATE_HSD_ONE_SLICE_REDUCER = updateHsdTankOneReportSlice.reducer