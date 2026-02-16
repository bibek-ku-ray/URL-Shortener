import express from "express";
import cors from "cors";
import { userRouter } from "./router/user.routers.js";
import urlRouter from "./router/url.router.js";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3001", // Frontend URL
  credentials: true, // Allow cookies and authorization headers
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authenticationMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the URL Shortener API",
  });
});

app.use("/user", userRouter);
app.use(urlRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
