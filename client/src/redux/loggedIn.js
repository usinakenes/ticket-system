import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false,
    user: null,
}

export const loggedInSlice = createSlice({
    name: 'loggedIn',
    initialState,
    reducers: {
        setLoggedIn(state, user) {
            state.loggedIn = true;
            state.user = user.payload;
        },
        setLoggedOut(state){
            state.loggedIn = false;
            state.user = null;
        }
    }
})

export const { setLoggedIn, setLoggedOut } = loggedInSlice.actions;
export default loggedInSlice.reducer;