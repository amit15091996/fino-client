import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addHsdTankOneReportService = createAsyncThunk("addHsdTankOneReportService", async(hsdOne) => {

    return (await hsdOne?.protectedInterceptors.post(`fuel-report/insert-hsd-tank-one-reports`,hsdOne?.payload))?.data
})

const addHsdTankOneReportSlice = createSlice({

    name: "addHsdTankOneReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(addHsdTankOneReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(addHsdTankOneReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(addHsdTankOneReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    },

}

)
export const ADD_HSD_ONE_SLICE_REDUCER = addHsdTankOneReportSlice.reducer