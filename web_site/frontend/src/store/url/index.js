import {createSlice} from "@reduxjs/toolkit";
import {getUrlById} from "./actions";

const initialState = {
    loading: false,
    url: null,
}

export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUrlById.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getUrlById.fulfilled, (state, action) => {
            state.loading = false;
            state.url = action.payload.url;
        })

        builder.addCase(getUrlById.rejected, (state) => {
            state.loading = false;
            state.url = null;
        })
    }
})

