import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    repository: [],
    selectedMovie: {},
    selectedPerson: []
}

export const MovieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setRepository: (state, action) => {
            state.repository = action.payload;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        setSelectedPerson: (state, action) => {
            state.selectedPerson = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setRepository, setSelectedMovie, setSelectedPerson } = MovieSlice.actions



export default MovieSlice.reducer