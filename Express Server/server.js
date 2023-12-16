import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import castRouter from './Routers/castRouter.js'
import movieRouter from './Routers/movieRouter.js'
import { errorHandler, notFoundPage } from './Middleware/errors.js'
import { Logger } from './Middleware/logger.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// ---------------------------
// Connect to MongoDB database
// ---------------------------

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => { console.log('DB connected successfully') })
    .catch((err) => { console.log('DB did not connect successfully') })


// ------------------------------------------
// ------------ Logger Middleware -----------
// ------------------------------------------

app.use(Logger)


// -------------------------------
// ------------ Router -----------
// -------------------------------

app.use('/cast', castRouter)
app.use('/movie', movieRouter)

// ------------------------------------------
// ------------ Error Midilleware -----------
// ------------------------------------------

app.use(notFoundPage)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    try {
        console.log(`Server worked successfully on port ${process.env.PORT}`)
    }
    catch (err) {
        console.log('Server does not work')
    }
})
