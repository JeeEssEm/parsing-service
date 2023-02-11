import {createSlice} from "@reduxjs/toolkit";
import {getUrls} from "./actions";


const initialState = {
    loading: false,
    urls: [],
    loaded: false
}


export const urlsSlice = createSlice({
    name: 'urls',
    initialState,
    reducers: {
        removeUrlById: (state, id) => {
            const index = state.urls.findIndex((url) => url.id === id);
            state.urls.splice(index, 1);
        },
        addUrl(state, action) {
            state.urls.push(action.payload.url);
        }
    },
    extraReducers: builder => {
        builder.addCase(getUrls.pending, (state) => {
          state.loading = true
        })

        builder.addCase(getUrls.fulfilled, (state, action) => {
          state.loading = false;
          state.urls = action.payload.urls;
          state.loaded = true;
        })

        builder.addCase(getUrls.rejected, (state) => {
          state.loading = false;
          state.urls = [];
        })
    }
})


export const {removeUrlById, addUrl} = urlsSlice.actions;


