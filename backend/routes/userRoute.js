const express = require("express");


const signupController = require("../controllers/signupController.js");
const signinController = require("../controllers/signinController.js");
const authMiddleware = require("../middlewares/middleware.js");
const userUpdateController = require("../controllers/updateController.js");
const getAllUsersController = require("../controllers/allUsersController.js");

const userRouter = express.Router();


userRouter.post("/signup" , signupController);

userRouter.post("/signin" , signinController);

userRouter.put("/update", authMiddleware , userUpdateController);

userRouter.get("/bulk", authMiddleware, getAllUsersController);

module.exports = userRouter;
