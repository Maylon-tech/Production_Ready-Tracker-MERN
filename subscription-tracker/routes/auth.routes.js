import { Router } from "express"
import { signIn, signOut, signUp } from "../controllers/authController.js"

const authRouter = Router()


//Path: /api/v1/auth/[sign-in | sign-up | sign-out] POST
authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', signIn)
authRouter.post('/sign-out', signOut)

export default authRouter