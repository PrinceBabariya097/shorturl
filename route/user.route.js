import express from "express"
import { logInUser, signUpUser } from "../controller/user.js"

export const userRouter = express.Router()

userRouter.route('/signup').post(signUpUser)
userRouter.route('/login').post(logInUser)