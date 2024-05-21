import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProtectedInterceptors from "../../../hooks/ProtectedInterceptors";

export const getAllUsersService = createAsyncThunk("getAllUsersService", async(protectedInterceptors) => {

    return (await protectedInterceptors.get(`user/get-all-users`))?.data
})

const getAllUsersSlice = createSlice({

    name: "getAllUsersSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsersService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(getAllUsersService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(getAllUsersService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const GET_ALL_USERS_SLICE_REDUCER = getAllUsersSlice.reducer