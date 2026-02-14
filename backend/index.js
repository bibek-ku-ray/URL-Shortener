import express from "express"
import { userRouter } from "./router/user.routers.js"

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the URL Shortener API"
  })
})

app.use("/user", userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})