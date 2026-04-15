import { Router } from "express"

const userRouter = Router()

userRouter.get('/', (req, res) => res.send("GET All Users"))

userRouter.get('/:id', (req, res) => res.send("GET User Details"))

userRouter.post('/', (req, res) => res.send("CREATE New User"))

userRouter.put('/:id', (req, res) => res.send("UPDATE User"))

userRouter.delete('/:id', (req, res) => res.send("DELETE User"))

export default userRouter