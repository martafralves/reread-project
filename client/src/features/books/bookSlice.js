import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from './bookService'

const initialState = {
    books: [],
    isError: false,
    isScuccess: false,
    isLoading: false,
    message: ''
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
})

export const {reset} = bookSlice.actions
export default bookSlice.reducer