const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Models
const Genre= require('../Models/Genre')
const User= require ("../Models/User")
const Manga=require("../Models/Manga")
//Middlewares
const isAuth = require("../Middlewares/auth")
const isAdmin= require ("../Middlewares/isAdmin")




// show user list
router.get("/usersList",isAuth,isAdmin,async (req,res)=>{
    const list=await User.find()
    res.send({msg:"List of all the users",list})
   })

   // show genre list
router.get("/genreList",async (req,res)=>{
    const list=await Genre.find()
    res.send({msg:"List of all the genre",list})
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
 if (!user) {return res.send("Bad username/password!")}
// check password
 const isPass= await bcrypt.compare(password,user.password)
  if (!isPass) {return res.send("Bad username/password!")}
// generate a token
 const payload={id:user._id}
const token= jwt.sign(payload,"ninja",{expiresIn:"1 day"})
res.header("Authorization", `Bearer ${token}`);
res.send({ msg: "logged in", user,token });
});


 //update a user
router.put("/updateUser/:_id",isAuth,async (req,res)=>{
    const {_id}=req.params
    const {firstName,lastName,userName}=req.body
    const userUpdate= await User.findByIdAndUpdate(_id,{firstName,lastName,userName},{new : true})
    res.send({msg:"User updated successfully",userUpdate})
   })


//update password
router.put("/updatePassword/:_id",isAuth,async (req,res)=>{
const {_id}=req.params
 const {checkPass,newPassword}=req.body
 const user=await User.findOne({_id})
 //check the current password
 const isMatch= await bcrypt.compare(checkPass,user.password)
 if (!isMatch) {return res.send("This is not the current password!")}
 //change the password
 const salt=10
    const hashedPassword= await bcrypt.hash(newPassword,salt)
    user.password=hashedPassword
    await user.save()
    res.send({msg:"Password changed successfully",user})
})
 

   
   //delete a user
   router.delete("/deleteUser/:_id",isAuth,isAdmin, async (req,res)=>{
    const {_id}=req.params
    await User.findByIdAndDelete((_id))
    res.send({msg:"User deleted successfully"})
   })
 
// add new manga
router.post('/addManga',async (req,res)=>{
    const {title,synopsis,picture,author,chapters,genre}=req.body
    // check if mangas already exist
 let  manga=await Manga.findOne({title})
 if (manga) {return res.send("Manga already exist")}

     manga = new Manga({title,synopsis,picture,author,chapters,genre})
    await manga.save()
    res.send({msg:"Manga added successfully",manga})
})
 
// show manga list
router.get("/MangaList",async (req,res)=>{
 const list=await Manga.find()
 res.send({msg:"List of all the mangas",list})
})

//Search for manga
router.get("/Search/:searchTerm",async (req,res)=>{
const searchManga=await Manga.find({$text: {searchTerm: req.query.search}})
res.send({msg:"Search result",searchManga})
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
//get auth user

router.get("/user",isAuth,(req,res)=>{
    res.send({user:req.user})
    })

    //
    router.get('/:id', async (req, res) => {
          const manga = await Manga.findById(req.params.id);
          res.json(manga)
        })



module.exports=router