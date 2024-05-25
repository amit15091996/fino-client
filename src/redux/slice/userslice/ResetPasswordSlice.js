import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const resetPasswordService = createAsyncThunk("resetPasswordService", async(reset) => {

    return (await reset?.protectedInterceptors.post(`user/reset-password?mobileNumber=${reset?.mobileNumber}&oldPassword=${reset?.oldPassword}&newPassword=${reset?.newPassword}`))?.data
})

const resetPasswordSlice = createSlice({

    name: "resetPasswordSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(resetPasswordService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(resetPasswordService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(resetPasswordService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const RESET_PASSWORD_SLICE_REDUCER = resetPasswordSlice.reducer