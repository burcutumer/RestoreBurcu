import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSeach() {
    const { productParams } = useAppSelector(state => state.catalog);
    const [searchTerm, setSeachTerm] = useState(productParams.searchTerm);  //local state usage for searchTerm
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event:any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 3000)

    return (
        <TextField
            label='Seach Products'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}                 //local state usage for searchTerm
            onChange={(event:any) => {
                setSeachTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}