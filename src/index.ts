import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./http/routes/user-routes.js";
import { appDataSource } from "./db/config/data-source.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(userRouter);

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
