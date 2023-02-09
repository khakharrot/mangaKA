const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User= require ("../Models/User")
const Manga=require("../Models/Manga")
const isAuth = require("../Middlewares/auth")
const isAdmin= require ("../Middlewares/isAdmin")

// show user list
router.get("/usersList",isAuth,isAdmin,async (req,res)=>{
    const list=await User.find()
    res.send({msg:"List of all the users",list})
   })
 
//create a new user 
router.post('/SignUp', async (req, res) => {
    const {firstName,lastName,userName,email,password,picture}=req.body
    let user= await User.findOne({email})
    if (user) {return res.send("Mail already registered")}
    
    user=new User({firstName,lastName,userName,email,password,picture})
    const salt=10
    const hashedPassword= await bcrypt.hash(password,salt)
    user.password=hashedPassword
    await user.save()
    res.send({msg:"User created successfully",user})
})

//login
router.post('/login',async (req,res)=>{
 const {userName,password}=req.body
  // check userName
 const user=await User.findOne({userName})
 if (!user) {return res.send("Bad username/password")}
// check password
 const isPass= await bcrypt.compare(password,user.password)
  if (!isPass) {return res.send("Bad username/password")}
// generate a token
 const payload={id:user._id}
const token= jwt.sign(payload,"ninja",{expiresIn:"1 day"})
 res.send({msg:"logged in",user,token})
 })

 //update a user
router.put("/updateUser/:_id",isAuth,async (req,res)=>{
    const {_id}=req.params
    const userUpdate= await User.findByIdAndUpdate((_id),{$set:req.body})
    res.send({msg:"User updated successfully",userUpdate})
   })
   
   //delete a user
   router.delete("/deleteUser/:_id",isAuth,isAdmin, async (req,res)=>{
    const {_id}=req.params
    await User.findByIdAndDelete((_id))
    res.send({msg:"User deleted successfully"})
   })
 
// add new manga
router.post('/addManga',isAuth,async (req,res)=>{
    const {title,author,synopsis,picture,rating,chapters}=req.body
    // check if mangas already exist
 let  manga=await Manga.findOne({title})
 if (manga) {return res.send("Manga already exist")}

     manga = new Manga({title,author,synopsis,picture,rating,chapters})
    await manga.save()
    res.send({msg:"Manga added successfully",manga})
})
 
// show manga list
router.get("/MangaList",async (req,res)=>{
 const list=await Manga.find()
 res.send({msg:"List of all the mangas",list})
})


//update a manga
router.put("/updateManga/:_id",isAuth,async (req,res)=>{
const {_id}=req.params
const toUpdate= await Manga.findByIdAndUpdate((_id),{$set:req.body})
 res.send({msg:"Manga updated successfully",toUpdate})
})

//delete a manga
router.delete("/deleteManga/:_id",async (req,res)=>{
 const {_id}=req.params
 const toDelete= await Manga.findByIdAndDelete((_id))
 res.send({msg:"Manga deleted successfully",toDelete})
})


module.exports=router