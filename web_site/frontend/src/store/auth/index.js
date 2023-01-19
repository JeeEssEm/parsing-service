import {createSlice} from "@reduxjs/toolkit";
import {register, login, logout, checkAuth} from "./actions";
import AuthService from "../../services/AuthService";


const user = AuthService.getCurrentUser();

const initialState = {
    isAuth: !!user,
    user: user ? user : null,
    loading: true
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogouted: (state) => {
            state.user = null;
            state.isAuth = false;
        },

        removeLoading: (state) => {
            state.loading = false;
        }
    },

    extraReducers: (builder) => {
        builder.addCase(
            register.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            register.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.user = action.payload.user
        });

        builder.addCase(register.rejected, (state) => {
            state.loading = false;
            state.isAuth = false;
        });

        builder.addCase(login.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuth = true;
            state.user = action.payload.user
        });

        builder.addCase(login.rejected, (state) => {
            state.loading = false;
            state.isAuth = false;
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.isAuth = false;
            state.user = null;
        });

        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuth = true;
            state.loading = false;
            state.user = action.payload.user;
        });

        builder.addCase(checkAuth.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(checkAuth.rejected, (state) => {
            state.isAuth = false;
            state.loading = false;
            state.user = null;
        })
    }
})



