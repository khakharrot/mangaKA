const jwt = require('jsonwebtoken')
const User=require('../Models/User')

const isAuth= async (req,res,next)=>{
const token= req.header('x-auth-token')
if (!token) return res.send ({msg:"no authorization detected"})
//check token
const decoded=await jwt.verify(token,"ninja")

const user= await User.findById(decoded.id)
if(!user) return res.send({msg:"invalid token"})
req.user=user

next()
}

module.exports=isAuth