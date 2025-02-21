const express=require('express')
const router=express.Router()
const userrouter=require('./users')
const acccountrouter=require('./accounts')

router.use("/user",userrouter)
router.use("/account",acccountrouter)

module.exports=router
