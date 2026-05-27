import express from 'express'
import dotenv from 'dotenv'
import connectToDatabase from './database/mongodb.js'
import cookieParser from 'cookie-parser'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import errorHandlerMiddleware from './middleware/errorHandler.middleware.js'
import arcjetMiddleware from './middleware/arcjet.middleware.js'

import { PORT } from './config/env.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(arcjetMiddleware)

dotenv.config()
connectToDatabase()

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)

app.use(errorHandlerMiddleware)

app.get("/", (req, res) => {
    res.send("Welcome to the Subs-tracker backend production ready.")
})


app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`)
})