import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    title: {
        required: true,
        trim: true,
        type: String,
    },
    cover: {
        public_id: {
            type: String,
            required: true,
            trim: true
        },
        url: {
            type: String,
            required: true,
            trim: true
        }
    },
    topCasts: {
        type: Array,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['action', 'comedy', 'romantic']
    },
    relatedMovies: {
        type: Array,
        required: true,
    }
}, { timestamps: true })

const movieModel = mongoose.model('movie', movieSchema)

export default movieModel