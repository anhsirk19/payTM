const express = require("express");
const userRouter = require("./userRoute.js");

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);

module.exports = mainRouter;