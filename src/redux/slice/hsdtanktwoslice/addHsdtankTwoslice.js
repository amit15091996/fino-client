import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addHsdTankTwoReportService = createAsyncThunk("addHsdTankTwoReportService", async(hsdTwo) => {

    return (await hsdTwo?.protectedInterceptors.post(`fuel-report/insert-hsd-tank-two-reports`,hsdTwo?.payload))?.data
})

const addHsdTankTwoReportSlice = createSlice({

    name: "addHsdTankTwoReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(addHsdTankTwoReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(addHsdTankTwoReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(addHsdTankTwoReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    },

}

)
export const ADD_HSD_TWO_SLICE_REDUCER = addHsdTankTwoReportSlice.reducer