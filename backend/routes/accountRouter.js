const express = require("express");

const accRouter = express.Router();

const { balanceController, transferController} = require("../controllers/accountController.js");
const authMiddleware = require("../middlewares/middleware.js");


accRouter.get("/balance", authMiddleware, balanceController);
accRouter.post("/transfer", authMiddleware, transferController);


module.exports = accRouter;

