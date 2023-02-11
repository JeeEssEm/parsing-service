import {createAsyncThunk} from "@reduxjs/toolkit";
import UrlService from "../../services/UrlService";


export const getUrls = createAsyncThunk(
    'urls/getUrls',
    async (thunkAPI) => {
        try {
            const resp = await UrlService.fetchUrls();

            return resp.data;
        }
        catch (e) {
            console.log(e)
            return thunkAPI.rejectedWithValue("")
        }
    })

