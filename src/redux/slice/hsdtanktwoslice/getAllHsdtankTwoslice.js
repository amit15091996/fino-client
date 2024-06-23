import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllHsdTankTwoReportService = createAsyncThunk("getAllHsdTankTwoReportService", async(protectedInterceptors) => {

    return (await protectedInterceptors.get(`fuel-report/get-all-hsd-tank-two-reports`))?.data
})

const  getAllHsdTankTwoReportSlice = createSlice({

    name: "getAllHsdTankTwoReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(getAllHsdTankTwoReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(getAllHsdTankTwoReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(getAllHsdTankTwoReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const GET_ALL_HSD_TWO_SLICE_REDUCER = getAllHsdTankTwoReportSlice.reducer