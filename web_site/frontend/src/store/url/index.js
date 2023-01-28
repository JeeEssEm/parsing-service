import {createSlice} from "@reduxjs/toolkit";
import {createUrl, getUrlById} from "./actions";

const initialState = {
    loading: false,
    url: null,
    id: null
}

export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {
        clearUrl: (state) => {
            state.url = null;
            state.id = null;
            state.loading = false;
        }
    },
    extraReducers: builder => {
        // получение url
        builder.addCase(getUrlById.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getUrlById.fulfilled, (state, action) => {
            state.loading = false;
            state.url = action.payload.url;
            state.id = action.payload.id
        })

        builder.addCase(getUrlById.rejected, (state) => {
            state.loading = false;
            state.url = null;
            state.id = null;
        })

        // создание url
        builder.addCase(createUrl.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(createUrl.fulfilled, (state) => {
            state.loading = false
        })

        builder.addCase(createUrl.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const { clearUrl } = urlSlice.actions;

