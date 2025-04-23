const express = require("express");
const userRouter = require("./userRoute.js");
const accRouter = require("./accountRouter.js");

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/account", accRouter);

module.exports = mainRouter;