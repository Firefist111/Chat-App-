import cors from 'cors'
import {io,server,app} from './socketIO/socket.js'
import express from "express";

import { connectDb } from "./config/db.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


import cookieParser from "cookie-parser";
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT;

connectDb();

import userRouter from "./routes/userRoute.js";
app.use("/api/v1/user", userRouter);

import messageRouter from "./routes/messageRoute.js";
app.use("/api/v1/message", messageRouter);

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
