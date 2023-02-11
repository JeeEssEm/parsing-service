import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import axios from "axios";
import {API_URL} from "../../http";
import {setMessage, setSuccessMessage} from "../message";


export const register = createAsyncThunk(
    'auth/register',
    async ({name, password}, thunkAPI) => {
        try {
            const resp = await AuthService.registration(name, password);
            // thunkAPI.dispatch(resp)
            return resp.data;
        }
        catch (e) {
            console.log(e);
            thunkAPI.dispatch(setMessage(e.response.data))
            return thunkAPI.rejectWithValue("")
        }
    }
);


export const login = createAsyncThunk(
    'auth/login',
    async ({name, password}, thunkAPI) => {
        try {
            const resp = await AuthService.login(name, password);
            // thunkAPI.dispatch(resp)

            console.log(resp);
            return resp.data;
        }
        catch (e) {
            console.log(e, e.message);
            thunkAPI.dispatch(setMessage(e.response.data))
            return thunkAPI.rejectWithValue("");
        }
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await AuthService.logout();
    }
);


export const checkAuth = createAsyncThunk(
    'auth/check_auth',
    async (arg, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}auth/api/users/refresh`, {
                withCredentials: true
            });

            localStorage.setItem('token', response.data.access_token);
            return response.data;
        }
        catch (e) {
            console.log(e);
            thunkAPI.dispatch(setMessage(e.response.data))
            return thunkAPI.rejectWithValue("")
        }
    }
)


export const changeInfo = createAsyncThunk(
    'user/change',
    async ({name}, thunkAPI) => {
        try {
            const response = await AuthService.changeUserInfo({name});

            if (response) {
                thunkAPI.dispatch(setSuccessMessage(response.data));
            }

            return response.data;
        }
        catch (e) {
            thunkAPI.dispatch(setMessage(e.response.data));
            return thunkAPI.rejectWithValue("")
        }
    }
)

export const changePassword = createAsyncThunk(
    'user/password',
    async ({resetCode, newPassword}, thunkAPI) => {
        try {
            const response = await AuthService.changePassword({newPassword, resetCode});

            if (response) {
                thunkAPI.dispatch(setSuccessMessage(response.data));
            }

            return response.data;
        }
        catch (e) {
            thunkAPI.dispatch(setMessage(e.response.data));
            return thunkAPI.rejectWithValue("")
        }
    }
)



