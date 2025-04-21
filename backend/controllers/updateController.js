const userModel = require("../db.js");

const userUpdateController = async (req, res) => {
    const {firstName, lastName, password} = req.body;

    const userId = req.body.id;
    const user = await userModel.findById({userId});

    if(firstName){
        user.firstName = firstName;
        await user.save();
    }

    if(lastName){
        user.lastName = lastName;
        await user.save();
    }
    if(password){
        //generate hashed password
        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;

        await user.save();
    }

}

module.exports = userUpdateController;