import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import {
  authRouter,
  commentsRouter,
  postRouter,
  userRouter,
  followsRouter,
} from "./http/routes";

import { appDataSource } from "./db/config/data-source";
dotenv.config();

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(authRouter);
app.use(postRouter);
app.use(commentsRouter);
app.use(followsRouter);

app.get("/", (req, res) => {
  res.json({
    Status: "success",
  });
});

const PORT = process.env.PORT || 3000;

appDataSource
  .initialize()
  .then(() => {
    console.log("Connected to the DB");

    app.listen(PORT, () => {
      console.log("Application started on port 3000");
    });
  })
  .catch((error) => console.error(`Error connecting to the DB: ${error}`));
