import express  from "express";
import { createCast, deleteCast, editCast, getCast, getCasts } from "../Controllers/castController.js";

const castRouter = express.Router()


castRouter.get('/getcasts',getCasts)
castRouter.get('/getcast/:id',getCast)
castRouter.post('/createcast',createCast)
castRouter.patch('/editcast/:castId',editCast)
castRouter.delete('/deletecast/:castId',deleteCast)


export default castRouter
