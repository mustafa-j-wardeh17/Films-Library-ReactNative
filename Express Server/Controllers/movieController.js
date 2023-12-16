import Joi from "joi";
import asyncHandler from 'express-async-handler'
import cloudinary from '../utils/cloudinary.js'
import movieModel from "../models/movieModel.js";

export const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await movieModel.find()
    if (movies.length !== 0) {
        res.status(200).json(movies)
    }
    else {
        res.status(404).json({ err: 'no movie found' })
    }

})
export const getMovies = asyncHandler(async (req, res) => {
    const movies = await movieModel.find({ type: req.query.category })
    if (movies.length !== 0) {
        res.status(200).json(movies)
    }
    else {
        res.status(404).json({ err: 'no movie found' })
    }

})
export const getRelatedMovies = asyncHandler(async (req, res) => {
    const movies = await movieModel.find({ title: { $in: req.query.relatedMovies.split(',') } })
    if (movies.length !== 0) {
        res.status(200).json(movies)
    }
    else {
        res.status(404).json({ err: 'no related movies found' })
    }

})

export const getMovie = asyncHandler(async (req, res) => {
    const movieId = req.params.movieId
    try {
        const movie = await movieModel.find(movieId)
        if (movie) {
            res.status(200).json(movie)
        }
        else {
            res.status(404).json({ err: `no movie found with added id ${movieId}` })
        }
    }
    catch (error) {
        res.status(500).json({ err: `no movie with id ${movieId}` })
    }

})

export const createMovie = asyncHandler(async (req, res) => {

    const { title, topCasts, type, relatedMovies } = req.body

    const result = await cloudinary.uploader.upload(req.body.cover, {
        folder: 'moviesFolder'
    })

    req.body.cover = {
        public_id: result.public_id,
        url: result.secure_url
    }


    const { error } = validateCreateMovie(req.body)
    if (error) {
        return res.status(400).json({ err: error.details[0].message })
    }


    const newMovie = new movieModel({
        title,
        cover: {
            public_id: req.body.cover.public_id,
            url: req.body.cover.url,
        },
        topCasts,
        type,
        relatedMovies
    })

    await newMovie.save()

    if (newMovie) {
        res.status(201).json(newMovie)
    }
    else {
        return res.status(404).json({ err: 'movie does not created successfully' })
    }

})


export const editMovie = asyncHandler(async (req, res) => {
    const movieId = req.params.movieId;
    if (!movieId) {
        return res.status(400).json({ error: 'Movie Id is required for editing.' });
    }

    const existingMovie = await movieModel.findById(movieId);
    if (!existingMovie) {
        return res.status(404).json({ error: 'No movie found with the provided ID.' });
    }

    if (req.body.cover) {
        //delete previous image
        const deletedImageResult = await cloudinary.uploader.destroy(existingMovie.cover.public_id, {
            folder: 'moviesFolder'
        });
        if (deletedImageResult.result !== 'ok') {
            return res.status(400).json({ err: 'image does not edited successfully' })
        }

        //add edited image
        const result = await cloudinary.uploader.upload(req.body.cover, {
            folder: 'moviesFolder'
        });

        req.body.cover = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    //validate input
    const { error } = validateEditMovie(req.body)
    if (error) {
        return res.status(400).json({ err: error.details[0].message })
    }

    const updatedData = await movieModel.findByIdAndUpdate(
        movieId,
        {
            ...req.body
        },
        { new: true }
    )

    res.status(200).json({
        successfull: 'ok',
        data: updatedData
    })

})



export const deleteMovie = asyncHandler(async (req, res) => {
    const movieId = req.params.movieId
    const findMovie = await movieModel.findById(movieId)
    if (!findMovie) {
        return res.status(404).json({ err: `there is no movie with id ${movieId}` })
    }
    const deletedMovieImage = await cloudinary.uploader.destroy(findMovie.cover.public_id)
    if (deletedMovieImage.result !== 'ok') {
        return res.status(500).json({ error: 'Failed to remove image from Cloudinary.' });
    }

    await movieModel.findByIdAndDelete(movieId)
    res.status(200).json(`Movie with id ${movieId} deleted successfully`)
})


//---------------------------------------------
//------------- Validation Edit ---------------
//---------------------------------------------
const validateCreateMovie = (data) => {
    const movieSchema = Joi.object({
        title: Joi.string().required().trim().min(2).max(100),
        cover: Joi.object({
            public_id: Joi.string().required(),
            url: Joi.string().required(),
        }).required(),
        topCasts: Joi.array().required(),
        type: Joi.string().required().trim(),
        relatedMovies: Joi.array().required(),
    })

    return movieSchema.validate(data)
}


const validateEditMovie = (data) => {
    const movieSchema = Joi.object({
        title: Joi.string().trim().min(2).max(100),
        cover: Joi.object({
            public_id: Joi.string(),
            url: Joi.string(),
        }),
        topCasts: Joi.array(),
        type: Joi.string().trim(),
        relatedMovies: Joi.array(),
    })

    return movieSchema.validate(data)
}