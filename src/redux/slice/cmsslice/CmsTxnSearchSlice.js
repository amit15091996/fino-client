import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const cmsTxnSearchService = createAsyncThunk("cmsTxnSearchService", async(cms) => {

       const ifYearPresent=cms?.year?`&year=${cms?.year}`:""
       const ifMonthPresent=cms?.month? `&month=${cms?.month}`:""
       const ifDatesPresent=cms?.fromDate && cms?.toDate? `&fromDate=${cms?.fromDate}&toDate=${cms?.toDate}`:""
    return (await cms?.protectedInterceptors.get(`operation/get-cms-transaction-by-dates?mobileNumber=${cms?.mobileNumber}${ifYearPresent}${ifMonthPresent}${ifDatesPresent}`))?.data
})


export const setCmsSearchSliceToInitialState=createAction("RESET_CMS_SEARCH_SLICE")
const cmsSearchInitialState={isLoading: false,data: null,error:null}


const cmsTxnSearchSlice = createSlice({

    name: "cmsTxnSearchSlice",
    initialState:cmsSearchInitialState,
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

        builder.addCase(setCmsSearchSliceToInitialState,()=>cmsSearchInitialState)
    }

}

)
export const CMS_TXN_SEARCH_SLICE_REDUCER = cmsTxnSearchSlice.reducer