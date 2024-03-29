import {createAsyncThunk} from "@reduxjs/toolkit";
import UrlService from "../../services/UrlService";
import {setMessage, setSuccessMessage} from "../message";
import {addUrl, removeUrlById} from "../urls";


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
    async ({xpath, title, description, url, type, comparer, appearedValue, edit}, thunkAPI) => {
        try {
            const resp = await UrlService.createUrl(
                {xpath, title, description, url, type, comparer, appearedValue, edit}
            );
            if (resp.data) {
                thunkAPI.dispatch(setSuccessMessage(resp.data));
                thunkAPI.dispatch(addUrl(resp.data));
            }
        }
        catch (e) {
            thunkAPI.dispatch(setMessage(e.response.data));
            return thunkAPI.rejectWithValue("");
        }
    }
)


export const removeUrl = createAsyncThunk(
    'urls/remove',
    async ({id}, thunkAPI) => {
        try {
            const resp = await UrlService.removeUrl({id});

            if (resp.data) {
                thunkAPI.dispatch(removeUrlById(id));
                thunkAPI.dispatch(setSuccessMessage(resp.data));
            }
        }
        catch (e) {
            thunkAPI.dispatch(setMessage(e.response.data));
            return thunkAPI.rejectWithValue("");
        }
    }
)


