import {createAsyncThunk} from "@reduxjs/toolkit";
import UrlService from "../../services/UrlService";
import {setMessage, setSuccessMessage} from "../message";


export const getUrlById = createAsyncThunk(
    'urls/getUrlById',
    async ({id}, thunkAPI) => {
        try {
            const resp = await UrlService.fetchUrlById(id);

            return resp.data;
        }
        catch (e) {
            console.log(e);
            thunkAPI.dispatch(setMessage(e.response.data));
            return thunkAPI.rejectWithValue("");
        }
    })


export const createUrl = createAsyncThunk(
    'urls/create',
    async ({xpath, title, description, url, type, comparer, appearedValue}, thunkAPI) => {
        try {
            const resp = await UrlService.createUrl(
                {xpath, title, description, url, type, comparer, appearedValue}
            );
            if (resp.data) {
                thunkAPI.dispatch(setSuccessMessage(resp.data));
            }
            console.log(resp.data);
        }
        catch (e) {
            thunkAPI.dispatch(setMessage(e.response.data));
            return thunkAPI.rejectWithValue("");
        }
    }
)


