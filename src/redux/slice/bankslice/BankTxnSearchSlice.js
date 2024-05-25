import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const bankTxnSearchService = createAsyncThunk("bankTxnSearchService", async(deposit) => {

       const ifYearPresent=deposit?.year?`&year=${deposit?.year}`:""
       const ifMonthPresent=deposit?.month? `&month=${deposit?.month}`:""
       const ifDatesPresent=deposit?.fromDate && deposit?.toDate? `&fromDate=${deposit?.fromDate}&toDate=${deposit?.toDate}`:""
    return (await deposit?.protectedInterceptors.get(`operation/get-bank-transaction-by-dates?mobileNumber=${deposit?.mobileNumber}${ifYearPresent}${ifMonthPresent}${ifDatesPresent}`))?.data
})


export const setBankSearchSliceToInitialState=createAction("RESET_BANK_SEARCH_SLICE")
const bankSearchInitialState={isLoading: false,data: null,error:null}
const bankTxnSearchSlice = createSlice({

    name: "bankTxnSearchSlice",
    initialState:bankSearchInitialState ,
    extraReducers: (builder) => {
        builder.addCase(bankTxnSearchService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(bankTxnSearchService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(bankTxnSearchService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });

        builder.addCase(setBankSearchSliceToInitialState,()=>bankSearchInitialState)
    }

}

)
export const BANK_TXN_SEARCH_SLICE_REDUCER = bankTxnSearchSlice.reducer