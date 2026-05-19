import { Router } from "express"
import { getUser, getUsers } from "../controllers/userController.js"
import authorize from "../middleware/authMiddleware.js"

const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get('/:id', authorize, getUser)

userRouter.post('/', (req, res) => res.send("CREATE New User"))

userRouter.put('/:id', (req, res) => res.send("UPDATE User"))

userRouter.delete('/:id', (req, res) => res.send("DELETE User"))

export default userRouter