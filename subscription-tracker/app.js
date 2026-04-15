import express from 'express'

import { PORT } from './config/env.js'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'

const app = express()

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/subscription', subscriptionRouter)

app.get("/", (req, res) => {
    res.send("Welcome to the Subs-tracker backend production ready.")
})


app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`)
})