import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addClientsService = createAsyncThunk("addClientsService", async(client) => {

    return (await client?.protectedInterceptors.post(`user/add-a-new-client`,client?.payload))?.data
})

const addClientsSlice = createSlice({

    name: "addClientsSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(addClientsService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(addClientsService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(addClientsService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    },

}

)
export const ADD_CLIENT_SLICE_REDUCER = addClientsSlice.reducer