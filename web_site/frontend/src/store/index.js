import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./auth";

export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice.reducer
    })
})


