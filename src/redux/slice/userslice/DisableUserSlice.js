import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const disableUserService = createAsyncThunk("disableUserService", async(user) => {

    return (await user?.protectedInterceptors.delete(`user/disable-an-user?mobileNumber=${user?.mobileNumber}`))?.data
})

const disableUserSlice = createSlice({

    name: "disableUserSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(disableUserService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(disableUserService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(disableUserService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const DISABLE_USER_SLICE_REDUCER = disableUserSlice.reducer