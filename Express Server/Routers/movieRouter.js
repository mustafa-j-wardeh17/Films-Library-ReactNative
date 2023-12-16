import express  from "express";
import { createMovie, deleteMovie, editMovie, getAllMovies, getMovie, getMovies, getRelatedMovies } from "../Controllers/movieController.js";

const movieRouter = express.Router()

movieRouter.get('/getAllmovies',getAllMovies)
movieRouter.get('/getmovies',getMovies)
movieRouter.get('/getRelatedMovies',getRelatedMovies)
movieRouter.get('/getmovie/:movieId',getMovie)
movieRouter.post('/createmovie',createMovie)
movieRouter.patch('/editmovie/:movieId',editMovie)
movieRouter.delete('/deletemovie/:movieId',deleteMovie)

export default movieRouter
