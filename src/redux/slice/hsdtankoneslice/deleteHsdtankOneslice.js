import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteHsdTankOneReportService = createAsyncThunk("deleteHsdTankOneReportService", async(deleteHsdTankOne) => {

    return (await deleteHsdTankOne?.protectedInterceptors.delete(`fuel-report/delete-a-hsd-tank-one-reports/${deleteHsdTankOne?.hsdTankOneId}`))?.data
})

const deleteHsdTankOneReportSlice = createSlice({

    name: "deleteHsdTankOneReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(deleteHsdTankOneReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(deleteHsdTankOneReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(deleteHsdTankOneReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const DELETE_HSD_ONE_SLICE_REDUCER = deleteHsdTankOneReportSlice.reducer