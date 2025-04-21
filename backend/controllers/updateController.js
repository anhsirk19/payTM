const { userModel } = require("../db.js");

const bcrypt = require("bcrypt");

const { nameSchema, passwordSchema } = require("../zodSchemas/schema.js");


const userUpdateController = async (req, res) => {

    try{
        const {firstName, lastName, password} = req.body;


        const userId = req.body.id;
        const user = await userModel.findById(userId);

        if(firstName){
            if(!nameSchema.safeParse(firstName).success){
                return res.status(409).send({
                    success : false,
                    message : " invalid inputs"
                })
            }
            user.firstName = firstName;
            await user.save();
        }

        if(lastName){
            if(!nameSchema.safeParse(lastName).success){
                return res.status(409).send({
                    success : false,
                    message : " invalid inputs"
                })
            }
            user.lastName = lastName;
            await user.save();
        }
        if(password){
            if(!passwordSchema.safeParse(password).success){
                return res.status(409).send({
                    success : false,
                    message : " invalid inputs"
                })
            }
            //generate hashed password
            var salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user.password = hashedPassword;

            await user.save();
        }

        return res.status(200).json({
            success : "true",
            message : " updated user successfully"
        })
    }catch(e){
        console.log(e);
        res.status(411).send({
            success : false,
            message : "error in update user controller"
        })
    }
    

}

module.exports = userUpdateController;