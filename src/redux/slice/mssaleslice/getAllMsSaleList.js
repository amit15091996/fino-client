import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllMsSaleReportService = createAsyncThunk("getAllMsSaleReportService", async(protectedInterceptors) => {

    return (await protectedInterceptors.get(`fuel-report/get-all-mssale-reports`))?.data
})

const  getAllMsSaleReportSlice = createSlice({

    name: "getAllMsSaleReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMsSaleReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(getAllMsSaleReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(getAllMsSaleReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const GET_ALL_MS_SALE_SLICE_REDUCER = getAllMsSaleReportSlice.reducer