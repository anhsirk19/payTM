const mongoose = require("mongoose");

const connectToMongoDB = async () => {
    try{
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

module.exports = {
    userModel : userModel
}