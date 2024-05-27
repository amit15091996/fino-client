import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateUserService = createAsyncThunk("updateUserService", async(updateUser) => {


    return (await updateUser?.protectedInterceptors.put(`user/update-fino-user`,updateUser?.payload))?.data
})

const updateUserSlice = createSlice({

    name: "updateUserSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(updateUserService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(updateUserService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(updateUserService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const UPDATE_USER_SLICE_REDUCER = updateUserSlice.reducer