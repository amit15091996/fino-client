import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getClientDetailsByUserNameService = createAsyncThunk("getClientDetailsByUserNameService", async(client) => {

    return (await client?.protectedInterceptors.post(`user/get-cms-txn-by-client/${client?.mobileNumber}`,client?.payload))?.data
})

const getClientDetailsByUserNameSlice = createSlice({

    name: "getClientDetailsByUserNameSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(getClientDetailsByUserNameService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(getClientDetailsByUserNameService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(getClientDetailsByUserNameService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    },

}

)
export const GET_CLIENT_BY_USERNAME_SLICE_REDUCER = getClientDetailsByUserNameSlice.reducer