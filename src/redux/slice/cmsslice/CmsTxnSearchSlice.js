import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const cmsTxnSearchService = createAsyncThunk("cmsTxnSearchService", async(cms) => {

       const ifYearPresent=cms?.year?`&year=${cms?.year}`:""
       const ifMonthPresent=cms?.month? `&month=${cms?.month}`:""
       const ifDatesPresent=cms?.fromDate && cms?.toDate? `&fromDate=${cms?.fromDate}&toDate=${cms?.toDate}`:""
    return (await cms?.protectedInterceptors.get(`operation/get-cms-transaction-by-dates?mobileNumber=${cms?.mobileNumber}${ifYearPresent}${ifMonthPresent}${ifDatesPresent}`))?.data
})

const cmsTxnSearchSlice = createSlice({

    name: "cmsTxnSearchSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(cmsTxnSearchService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(cmsTxnSearchService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(cmsTxnSearchService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const CMS_TXN_SEARCH_SLICE_REDUCER = cmsTxnSearchSlice.reducer