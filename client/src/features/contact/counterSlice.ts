import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux counter with redux toolkit)'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {     //reduceri actionlara bolduk
        increment:(state, action) => {state.data += action.payload},  // statei mutate edebiliyoruz cunku orj reducer degil
        decrement:(state, action) => {state.data -= action.payload}   //orj reducera abstraction olrak dusun arkaplanda orjinaliyle replace edilir
    }
})

export const {increment, decrement} = counterSlice.actions;