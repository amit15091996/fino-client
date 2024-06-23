import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllHsdTankOneReportService = createAsyncThunk("getAllHsdTankOneReportService", async(protectedInterceptors) => {

    return (await protectedInterceptors.get(`fuel-report/get-all-hsd-tank-one-reports`))?.data
})

const  getAllHsdTankOneReportSlice = createSlice({

    name: "getAllHsdTankOneReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(getAllHsdTankOneReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(getAllHsdTankOneReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(getAllHsdTankOneReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const GET_ALL_HSD_ONE_SLICE_REDUCER = getAllHsdTankOneReportSlice.reducer