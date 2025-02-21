const express=require('express')
const {authmiddleware}=require('../middleware')
const {Account,Transactions,User}=require('../db')
const {mongoose}=require('mongoose')
const { toWords } = require('number-to-words');

const router=express.Router()

router.get("/balance",authmiddleware, async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    res.json(account.balance)
})

router.post("/transfer", authmiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    try {
        const account = await Account.findOne({ userId: req.userId }).session(session);
        console.log("this is sender : ",account)
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                msg: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        console.log("this is reciever : ",toAccount)
        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                msg: "Account not found"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // const fromUser = await User.findById(req.userId);
        // const toUser = await User.findById(to);

        await Transactions.create({
            from: { userId: req.userId, name: account.name },
            to: { userId: to, name: toAccount.name },
            amount: amount,
            description:`${account.name} sent ${toWords(amount)} rupees to ${toAccount.name}`
});


        await session.commitTransaction();
        session.endSession();

        res.json({
            msg: "Transaction successful"
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            msg: "Transaction failed",
            error: error.message
        });
    }
});

module.exports=router