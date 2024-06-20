import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllClientsService = createAsyncThunk("getAllClientsService", async(protectedInterceptors) => {

    return (await protectedInterceptors.get(`user/get-all-clients`))?.data
})

const  getAllClientsSlice = createSlice({

    name: "getAllClientsSlice",
    initialState: {
        isLoading: false,
        data: null,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(getAllClientsService.pending, (state, action) => {
            state.isLoading = true
            state.data = action.payload,
            state.error=action.error
        });
        builder.addCase(getAllClientsService.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload, 
            state.error=action.error
        });
        builder.addCase(getAllClientsService.rejected, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error=action.error
        });
    }

}

)
export const GET_ALL_CLIENTS_SLICE_REDUCER = getAllClientsSlice.reducer