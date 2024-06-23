import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteHsdTankTwoReportService = createAsyncThunk("deleteHsdTankTwoReportService", async(deleteHsdTwo) => {

    return (await deleteHsdTwo?.protectedInterceptors.delete(`fuel-report/delete-a-hsd-tank-two-reports/${deleteHsdTwo?.hsdTankTwoId}`))?.data
})

const deleteHsdTankTwoReportSlice = createSlice({

    name: "deleteHsdTankTwoReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(deleteHsdTankTwoReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(deleteHsdTankTwoReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(deleteHsdTankTwoReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const DELETE_HSD_TWO_SLICE_REDUCER = deleteHsdTankTwoReportSlice.reducer