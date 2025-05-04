import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", taskRoute);

export { app };
