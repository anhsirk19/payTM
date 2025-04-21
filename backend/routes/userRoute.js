const express = require("express");
const { userModel } = require("../db.js");

const jwt = require("jsonwebtoken");
const jwt_secret = require("../config.js");
const bcrypt = require("bcrypt");

const { nameSchema, emailSchema, passwordSchema } = require("../zodSchemas/schema.js");

const userRouter = express.Router();


userRouter.get("/signup" , async (req, res) => {
    try{
        const { userName, firstName, lastName, password } = req.body;

        if(!nameSchema.safeParse(firstName).suceess || !nameSchema.safeParse(lastName).success || !emailSchema.safeParse(userName).success || !passwordSchema.safeParse(password).success){
            return res.status(400).json({
                success : "false",
                message : " zod schema validations are wrong , incorrect inputs"
            })
        }

        const userAlredyPresent = await userModel.findOne({userName : userName});

        if(userAlredyPresent){
            res.send(409).json({
                success : "false",
                message : " user already exist !, you can sign in"
            })
        }
        //hased password
        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            userName,
            firstName,
            lastName,
            password : hashedPassword
        })

        return res.status(200).send({
            suceess : "true",
            message : "user created successfully",
            user,
            userId : user._id,
        });

        
    }catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            message:'error in sigup api',
            e
        })
    }
})

userRouter.get("/signin" , async (req, res) => {
    try{
        const { userName, password } = req.body;

        const user = await userModel.findOne({userName : userName});

        if(!user){
            res.send(411).json({
                success : "false",
                message : " user not present, please signup !"
            })
        }

        const valid = await bcrypt.compare(password, user.password);
        if(!valid){
            return res.status(411).json({
                success : "false",
                message : " password is wrong, enter again!"
            })
        }

        //generate the token
        const token = jwt.sign({id : user._id}, jwt_secret, {expiresIn : "7d"});

        return res.status(200).send({
            suceess : "true",
            message : "user login successful",
            user,
            userId : user._id,
            token : token
        });

        
    }catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            message:'error in login api',
            e
        })
    }
})

module.exports = userRouter;
