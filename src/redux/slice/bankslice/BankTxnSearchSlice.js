import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const bankTxnSearchService = createAsyncThunk("bankTxnSearchService", async(deposit) => {

       const ifYearPresent=deposit?.year?`&year=${deposit?.year}`:""
       const ifMonthPresent=deposit?.month? `&month=${deposit?.month}`:""
       const ifDatesPresent=deposit?.fromDate && deposit?.toDate? `&fromDate=${deposit?.fromDate}&toDate=${deposit?.toDate}`:""
    return (await deposit?.protectedInterceptors.get(`operation/get-bank-transaction-by-dates?mobileNumber=${deposit?.mobileNumber}${ifYearPresent}${ifMonthPresent}${ifDatesPresent}`))?.data
})

const bankTxnSearchSlice = createSlice({

    name: "bankTxnSearchSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
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
    }

}

)
export const BANK_TXN_SEARCH_SLICE_REDUCER = bankTxnSearchSlice.reducer