import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProtectedInterceptors from "../../../hooks/ProtectedInterceptors";

export const registerService = createAsyncThunk("registerService", async(signUp) => {

    const protectedInterceptors=ProtectedInterceptors()

    return (await protectedInterceptors.post(`user/sign-up`,signUp))?.data
})

const registerSlice = createSlice({

    name: "registerSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(registerService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(registerService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(registerService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const REGISTER_SLICE_REDUCER = registerSlice.reducer