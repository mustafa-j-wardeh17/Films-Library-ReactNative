import { configureStore } from '@reduxjs/toolkit'
import MovieSlice from './Movie/MovieSlice'


export const store = configureStore({
    reducer: {
        movie: MovieSlice,
    },
})