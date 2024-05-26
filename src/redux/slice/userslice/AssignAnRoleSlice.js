import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const assignAnRoleService = createAsyncThunk("assignAnRoleService", async(role) => {


    return (await role?.protectedInterceptors.post(`user/assign-a-new-role?mobileNumber=${role?.mobileNumber}&userRole=${role?.userRole}`))?.data
})

const assignAnRoleSlice = createSlice({

    name: "assignAnRoleSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(assignAnRoleService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(assignAnRoleService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(assignAnRoleService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const ASSIGN_ROLE_SLICE_REDUCER = assignAnRoleSlice.reducer