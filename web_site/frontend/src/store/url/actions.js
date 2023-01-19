import {createAsyncThunk} from "@reduxjs/toolkit";
import UrlService from "../../services/UrlService";
import {setMessage} from "../message";


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

