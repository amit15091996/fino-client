import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteAnRoleService = createAsyncThunk("deleteAnRoleService", async(role) => {


    return (await role?.protectedInterceptors.delete(`user/delete-previous-role?roleId=${role?.roleId}`))?.data
})

const deleteAnRoleSlice = createSlice({

    name: "deleteAnRoleSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(deleteAnRoleService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(deleteAnRoleService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(deleteAnRoleService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const DELETE_ROLE_SLICE_REDUCER = deleteAnRoleSlice.reducer