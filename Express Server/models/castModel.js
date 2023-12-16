import mongoose from "mongoose";


const castSchema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        type: String,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ['male', 'female'],
    },
    knownAt: {
        type: String,
        required: true,
        enum: ['action', 'romantic', 'comedy']
    },
    popularity: {
        type: Number,
        required: true,
        trim: true,
        min: 0,
        max: 100
    },
    image: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    biography: {
        type: String,
    },
    movies: {
        type: Array,
        required: true
    },
}, { timestamps: true })

const castModel = mongoose.model('cast', castSchema)

export default castModel