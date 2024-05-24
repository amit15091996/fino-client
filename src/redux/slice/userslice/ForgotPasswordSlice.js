import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosConfig } from "../../../config/AxiosConfig"; 

export const forgotPasswordService = createAsyncThunk("forgotPasswordService", async(forgot) => {

    return (await AxiosConfig.post(`auth/forgot-password?mobileNumber=${forgot?.mobileNumber}&dateOfBirth=${forgot?.dateOfBirth}`))?.data
})

const forgotPasswordSlice = createSlice({

    name: "forgotPasswordSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(forgotPasswordService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(forgotPasswordService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(forgotPasswordService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const FORGOT_PASSWORD_SLICE_REDUCER = forgotPasswordSlice.reducer