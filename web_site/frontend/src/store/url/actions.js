import {createAsyncThunk} from "@reduxjs/toolkit";
import UrlService from "../../services/UrlService";


export const getUrlById = createAsyncThunk(
    'urls/getUrlById',
    async ({id}, thunkAPI) => {
        try {
            const resp = await UrlService.fetchUrlById(id);

            return resp.data;
        }
        catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("");
        }

    })

