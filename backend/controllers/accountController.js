const { accountModel } = require("../db.js");

const mongoose = require("mongoose");

const balanceController = async (req, res) => {
    const account = await accountModel.findOne({userId : req.body.id});
    res.status(200).send({
        success : true,
        balance : account.balance
    })
}


const transferController = async (req, res) => {

    const session = await mongoose.startSession();
    //start Transaction
    session.startTransaction();

    const toAccount = req.body.to;
    const amount = req.body.amount;

    ///fetch the accounts

    const currAccount = await accountModel.findOne({userId : req.body.id}).session(session);

    if(!currAccount || currAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).send({
            success : false,
            message : " insufficient balance"
        })
    }
    
    const isValid = await accountModel.findOne({userId : toAccount}).session(session);

    if(!isValid){
        await session.abortTransaction();
        return res.status(400).send({
            success : false,
            message  : "invalid to id"
        })
    }

    //transef the amount
    await accountModel.updateOne({userId : req.body.id}, { $inc : {balance : -amount}}).session(session);
    await accountModel.updateOne({userId : toAccount}, {$inc : {balance : amount}}).session(session);

    //commit transaction
    await session.commitTransaction();

    return res.status(200).send({
        success : true,
        message : " transaction success"
    })
}



module.exports = {balanceController, transferController};