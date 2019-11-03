const mongoose = require('mongoose')
const Schema = mongoose.Schema
const skill = new Schema({
  userid: String,
  language: String,
  level: String,
  created_at: Date,
  updated_at: Date
})

module.exports = mongoose.model('skills_62672', skill)
