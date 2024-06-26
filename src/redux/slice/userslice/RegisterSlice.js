import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerService = createAsyncThunk("registerService", async(signUp) => {


    return (await signUp?.protectedInterceptors.post(`user/sign-up`,signUp?.payload))?.data
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