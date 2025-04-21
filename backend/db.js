const mongoose = require("mongoose");
require("dotenv").config();
const connectToMongoDB = async () => {
    try{
        console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mogodb");
    }catch(e){
        console.log(e);
    }
}

connectToMongoDB();

const userSchema = new mongoose.Schema({
    userName : String,
    firstName : String,
    lastName : String,
    password : String
})

const userModel = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.objectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const accountModel = mongoose.model("Account", accountSchema);

module.exports = {
    userModel : userModel,
    accountModel : accountModel
}