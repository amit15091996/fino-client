import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addMsSaleReportService = createAsyncThunk("addMsSaleReportService", async(msSale) => {

    return (await msSale?.protectedInterceptors.post(`fuel-report/insert-mssale-reports`,msSale?.payload))?.data
})

const addMsSaleReportSlice = createSlice({

    name: "addMsSaleReportSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(addMsSaleReportService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(addMsSaleReportService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(addMsSaleReportService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    },

}

)
export const ADD_MS_SALE_SLICE_REDUCER = addMsSaleReportSlice.reducer