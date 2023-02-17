const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const GenreSchema = new Schema({
  name:{
     type:[String]
 }
})

const newSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true},
  synopsis:{
        type: String,
        required: true,
    },
  picture:{
    type: String,
    required: true
  },
  author:{
  type: String,
  required: true
  },
  chapters:{
    type: Number,
    required: true
  }, 
  rating:{
    type: Number,
    required: true,
    default: 0
  },
  Genre:{
    type: [GenreSchema],
    required: true
  }
})
const Manga = mongoose.model('Manga', newSchema)
module.exports = Manga 