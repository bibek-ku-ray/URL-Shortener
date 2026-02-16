import express from "express";
import { userRouter } from "./router/user.routers.js";
import urlRouter from "./router/url.router.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the URL Shortener API",
  });
});

app.use("/user", userRouter);
app.use(urlRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});