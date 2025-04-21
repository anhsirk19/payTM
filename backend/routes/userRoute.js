const express = require("express");
const { userModel } = require("../db.js");

const jwt = require("jsonwebtoken");
const jwt_secret = require("../config.js");
const bcrypt = require("bcrypt");

const signupController = require("../controllers/signupController.js");
const signinController = require("../controllers/signinController.js");
const authMiddleware = require("../middlewares/middleware.js");
const userUpdateController = require("../controllers/updateController.js");

const userRouter = express.Router();


userRouter.post("/signup" , signupController);

userRouter.post("/signin" , signinController);

userRouter.put("/update", authMiddleware , userUpdateController);

module.exports = userRouter;
