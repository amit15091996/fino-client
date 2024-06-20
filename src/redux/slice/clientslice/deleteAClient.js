import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteClientService = createAsyncThunk("deleteClientService", async(deleteClient) => {

    return (await deleteClient?.protectedInterceptors.delete(`user/delete-a-new-client/${deleteClient?.clientId}`))?.data
})

const deleteClientSlice = createSlice({

    name: "deleteClientSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(deleteClientService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(deleteClientService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(deleteClientService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const DELETE_CLIENT_SLICE_REDUCER = deleteClientSlice.reducer