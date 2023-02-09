const mongoose= require('mongoose')
const Schema=mongoose.Schema;

const newSchema = new Schema({
    
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    picture:{
        type:String,
        required:false
    },
    isAdmin: { 
        type: Boolean,
        required: true,
        default: false },
})
const User=mongoose.model('User',newSchema)
module.exports=User