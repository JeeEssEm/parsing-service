import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    message: null,
    success: false
}


export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            console.log(action);
            console.log(state)
            state.message = action.payload.message;
            state.success = false;
        },

        setSuccessMessage: (state, action) => {
            state.message = action.payload.message;
            state.success = true;
        },

        clearMessage(state) {
            state.message = null;
        }
    }
})


export const { setMessage, setSuccessMessage, clearMessage } = messageSlice.actions

