const signinController = async (req, res) => {
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
}

module.exports = signinController;