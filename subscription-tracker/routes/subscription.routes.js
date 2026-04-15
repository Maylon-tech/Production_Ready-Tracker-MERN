import { Router } from 'express'

const subscriptionRouter = Router()

subscriptionRouter.get("/", (req, res) => res.send("GET All Subscription."))

subscriptionRouter.get("/:id", (req, res) => res.send("GET subscription details."))

subscriptionRouter.post("/", (req, res) => res.send("CREATE Subscription"))

subscriptionRouter.put("/:id", (req, res) => res.send("UPDATE Subscription"))

subscriptionRouter.delete("/:id", (req, res) => res.send("DELETE a Subscription"))


subscriptionRouter.get("/user/:id", (req, res) => res.send("All User Subscription"))

subscriptionRouter.get("/:id/cancel", (req, res) => res.send("CANCEL Subscription"))

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send("GET All Subscription"))


export default subscriptionRouter