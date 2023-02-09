const config = require("config")
const mongoose = require("mongoose")

const connect=()=>{
    mongoose.connect(config.get("MONGO_URI"))
    .then(()=>console.log("Mongoose is connected"))
    .catch((err)=>{console.log(err)})
}
module.exports=connect