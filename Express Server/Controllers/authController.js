import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import Joi from 'joi'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
dotenv.config()


export const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // Validate user input
    const { error } = RegisterValidation(req.body)
    if (error) {
        return res.status(400).json({ err: error.details[0].message })
    }
    //check if user already exists
    const findUser = await User.find({ email })

    if (findUser) {
        return res.status(400).json({ err: 'Email allready exist' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    await newUser.save()

    const token = jwt.sign({ username, email }, process.env.TOKEN_KEY)
    res.status(201).json({
        success: "ok",
        token
    })
})



export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    // Validate user input
    const { error } = LoginValidation(req.body)
    if (error) {
        return res.status(400).json({ err: error.details[0].message })
    }
    //check if user already exists
    const findUser = await User.findOne({ username })

    if (!findUser) {
        return res.status(400).json({ err: 'User does not found' })
    }
    const isMatch = await bcrypt.compare(password,findUser.password)
    if (!isMatch) {
        return res.status(400).json({ err: 'Password does not match' })
    }

    const token = jwt.sign({ username, email: findUser.email }, process.env.TOKEN_KEY)
    res.status(201).json({
        success: "ok",
        token
    })
})
// export const logout = asyncHandler(async (req, res) => {

// })




const RegisterValidation = (data) => {
    const registerSchema = Joi.object({
        username: Joi.string().min(5).trim().required().regex(/^[a-zA-Z0-9]+$/),
        email: Joi.string().email().trim().required(),
        password: Joi.string().min(8).required().regex(/^(?=.*[A-Z])/),
    });

    return registerSchema.validate(data);
};


const LoginValidation = (data) => {
    const loginSchema = Joi.object({
        username: Joi.string().min(5).trim().required(),
        password: Joi.string().min(8).required(),
    });

    return loginSchema.validate(data);
};
