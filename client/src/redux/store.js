import { configureStore } from "@reduxjs/toolkit";
import ticketCounterReducer from "./ticketCounter";
import loggedInReducer from "./loggedIn";

export default configureStore({
    reducer: {
        ticketCounter: ticketCounterReducer,
        loggedIn: loggedInReducer
    }
});