import Joi from "joi";
import castModel from "../models/castModel.js";
import asyncHandler from 'express-async-handler'
import cloudinary from '../utils/cloudinary.js'

export const getCasts = asyncHandler(async (req, res) => {
    const casts = await castModel.find({ movies: { $in: req.query.movies } });
    if (casts.length !== 0) {
        res.status(200).json(casts)
    }
    else {
        res.status(404).json({ err: `no cast with title ${req.query.movies} found` })
    }

})

export const getCast = asyncHandler(async (req, res) => {

    const cast = await castModel.findById(req.params.id)
    if (cast) {
        res.status(200).json(cast)
    }
    else {
        res.status(404).json({ err: `no cast found with added id ${req.params.id}` })
    }

})

export const createCast = asyncHandler(async (req, res) => {

    const { name, gender, knownAt, popularity, biography, movies } = req.body

    const result = await cloudinary.uploader.upload(req.body.image, {
        folder: 'castsFolder'
    })

    req.body.image = {
        public_id: result.public_id,
        url: result.secure_url
    }


    const { error } = validateCreateCast(req.body)
    if (error) {
        return res.status(400).json({ err: error.details[0].message })
    }


    const newcast = new castModel({
        name,
        image: {
            public_id: req.body.image.public_id,
            url: req.body.image.url,
        },
        gender,
        knownAt,
        popularity,
        biography,
        movies
    })
    await newcast.save()

    if (newcast) {
        res.status(201).json({ newcast })
    }
    else {
        return res.status(404).json({ err: 'no cast found with added id' })
    }

})


export const editCast = asyncHandler(async (req, res) => {
    //validate input
    const { error } = validateEditCast(req.body)
    if (error) {
        return res.status(400).json({ err: error.details[0].message })
    }
    // Check if castId is provided in the request
    const castId = req.params.castId;
    if (!castId) {
        return res.status(400).json({ error: 'Cast ID is required for editing.' });
    }

    // Find the existing cast entry in the database
    const existingCast = await castModel.findById(castId);
    if (!existingCast) {
        return res.status(404).json({ error: 'No cast found with the provided ID.' });
    }

    if (req.body.image) {
        const result = await cloudinary.uploader.upload(req.body.image, {
            folder: 'castsFolder'
        });

        req.body.image = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    const updatedData = await castModel.findByIdAndUpdate(
        castId,
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



export const deleteCast = asyncHandler(async (req, res) => {
    const castId = req.params.castId
    const findCast = await castModel.findById(castId)
    if (!findCast) {
        return res.status(404).json({ err: 'there is no cast with id ', castId })
    }
    console.log(findCast)
    const deletedCastImage = await cloudinary.uploader.destroy(findCast.image.public_id)
    if (deletedCastImage.result !== 'ok') {
        return res.status(500).json({ error: 'Failed to remove image from Cloudinary.' });
    }

    const deletedCastData = await castModel.findByIdAndDelete(castId)
    res.status(200).json(`cast with id ${castId} deleted successfully`)
})


//---------------------------------------------
//------------- Validation Edit ---------------
//---------------------------------------------
const validateCreateCast = (data) => {
    const castSchema = Joi.object({
        name: Joi.string().required().trim().min(2).max(30),
        gender: Joi.string().required().trim(),
        knownAt: Joi.string().required().trim(),
        popularity: Joi.number().min(0).max(100).required(),
        image: Joi.object({
            public_id: Joi.string().required(),
            url: Joi.string().required(),
        }).required(),
        biography: Joi.string(),
        movies: Joi.array().required(),
    })

    return castSchema.validate(data)
}
const validateEditCast = (data) => {
    const castSchema = Joi.object({
        name: Joi.string().trim().min(2).max(30),
        gender: Joi.string().trim(),
        knownAt: Joi.string().trim(),
        popularity: Joi.number().min(0).max(100),
        image: Joi.object({
            public_id: Joi.string(),
            url: Joi.string(),
        }),
        biography: Joi.string(),
        movies: Joi.array(),
    })

    return castSchema.validate(data)
}