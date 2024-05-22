import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosConfig } from "../../../config/AxiosConfig"; 

export const loginService = createAsyncThunk("loginService", async(login) => {

    return (await AxiosConfig.post(`auth/sign-in?mobileNumber=${login?.mobileNumber}&password=${login?.password}`))?.data
})

const loginSlice = createSlice({

    name: "loginSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(loginService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(loginService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(loginService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const LOGIN_SLICE_REDUCER = loginSlice.reducer