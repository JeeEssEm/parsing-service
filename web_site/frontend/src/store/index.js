import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./auth";
import {urlSlice} from "./url";
import {urlsSlice} from "./urls";
import {messageSlice} from "./message";


export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice.reducer,
        url: urlSlice.reducer,
        urls: urlsSlice.reducer,
        message: messageSlice.reducer
    })
});



