const { nameSchema, emailSchema, passwordSchema } = require("../zodSchemas/schema.js");

const { userModel, accountModel } = require("../db.js");

const bcrypt  = require("bcrypt");

const signupController = async (req, res) => {
    try{
        const { userName, firstName, lastName, password } = req.body;

        if(!nameSchema.safeParse(firstName).success || !nameSchema.safeParse(lastName).success || !emailSchema.safeParse(userName).success || !passwordSchema.safeParse(password).success){
            return res.status(400).json({
                success : "false",
                message : " zod schema validations are wrong , incorrect inputs"
            })
        }

        const userAlredyPresent = await userModel.findOne({userName : userName});

        if(userAlredyPresent){
            res.status(401).json({
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

        //give random balance to the user
        accountModel.create({
            userID,
            balance : 1 + Math.random()*10000
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
};

module.exports =  signupController;