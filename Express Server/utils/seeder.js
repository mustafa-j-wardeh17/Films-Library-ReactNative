import castModel from "../models/castModel.js";
import movieModel from "../models/movieModel.js";
import cloudinary from "./cloudinary.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => { console.log('DB connected successfully') })
    .catch((err) => { console.log('DB did not connect successfully') })

let castsData = [
    {
        name: 'Henry Fonda',
        gender: 'male',
        knownAt: 'action',
        popularity: 31,
        image: `https://cdn.sanity.io/images/43i2qy0q/production/ef583fa4cf71fcda559feb9e39794e771a231aaa-318x318.jpg?w=2000&fit=max&auto=format`,
        biography: `Henry Jaynes Fonda (May 16, 1905 – August 12, 1982) was an American actor whose career spanned five decades on Broadway and in Hollywood.[1] On screen and stage, he often portrayed characters that embodied an everyman image. Born and raised in Nebraska, Fonda made his mark early as a Broadway actor and made his Hollywood film debut in 1935. He rose to film stardom with performances in films like Jezebel (1938), Jesse James (1939) and Young Mr. Lincoln (1939). He received a nomination for the Academy Award for Best Actor for his role as Tom Joad in The Grapes of Wrath (1940).`,
        movies: ['12 Angry Men'],
    },

]

const importCasts = async () => {
    try {
        const newArray = []
        for (let i = 0; i < castsData.length; i++) {
            const result = await cloudinary.uploader.upload(castsData[i].image, {
                folder: 'castsFolder'
            })
            const newCast = {
                ...castsData[i],
                image: {
                    public_id: result.public_id,
                    url: result.url
                }
            }
            newArray.push(newCast)
        }
        await castModel.insertMany(newArray)
        console.log("Casts imported")
    } catch (error) {
        console.error(error)
    }
}


const removeCasts = async () => {
    try {
        await castModel.deleteMany()
        console.log("Casts deleted successfully")
    }
    catch (err) {
        console.log(`Cast does not deletet successfully ${err}`)
    }
}

const importMovies = async () => {
    try {
        await movieModel.insertMany()
        console.log("Casts imported")
    }
    catch (err) {
        console.log(`Cast does not imported successfully ${err}`)
    }
}
const removeMovies = async () => {
    try {
        await movieModel.deleteMany()
        console.log("Casts deleted successfully")
    }
    catch (err) {
        console.log(`Cast does not deletet successfully ${err}`)
    }
}



if (process.argv[2] === '-importCasts') {
    importCasts();
}
else if (process.argv[2] === '-removeCasts') {
    removeCasts()
}
else if (process.argv[2] === '-importMovies') {
    importMovies()
}
else if (process.argv[2] === '-removeMovies') {
    removeMovies()
}