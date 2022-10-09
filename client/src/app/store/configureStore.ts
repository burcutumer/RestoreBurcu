import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";
import { counterSlice } from "../../features/contact/counterSlice";

// export function configureStore() {
//     return createStore(counterReducer);
// }
export const store = configureStore({
    reducer: {                          // counterStatein counterSliceinin reduceri
        counter: counterSlice.reducer ,  //useAppSelector(state => state.counter)
        basket: basketSlice.reducer
    }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
