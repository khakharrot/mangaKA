const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const newSchema = new Schema({
     name:{
        type:String
    }

})

const Genre = mongoose.model('Genre',newSchema)
module.exports = Genre