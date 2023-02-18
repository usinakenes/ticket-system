import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    ticketCount: 0,
    maxTickets: 10
}

export const ticketCounterSlice = createSlice({
    name: 'ticketCounter',
    initialState,
    reducers: {
        setMax(state, action) {
            state.maxTickets = action.payload;
        },
        increment(state) {
            if (state.maxTickets > state.ticketCount) {
                state.ticketCount += 1;
            }
        },
        decrement(state){
            if (state.ticketCount >= 1) {
                state.ticketCount -= 1;
            }
        }
    }
})

export const { increment, decrement, setMax } = ticketCounterSlice.actions;
export default ticketCounterSlice.reducer;