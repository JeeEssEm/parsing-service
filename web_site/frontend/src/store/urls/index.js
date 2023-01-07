import {createSlice} from "@reduxjs/toolkit";
import {getUrls} from "./actions";


const initialState = {
    loading: false,
    urls: []
}


export const urlsSlice = createSlice({
    name: 'urls',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUrls.pending, (state) => {
          state.loading = true
        })

        builder.addCase(getUrls.fulfilled, (state, action) => {
          state.loading = false;
          state.urls = action.payload.urls
        })

        builder.addCase(getUrls.rejected, (state) => {
          state.loading = false;
          state.urls = [];
        })
    }
})

