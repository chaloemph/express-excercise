const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userdetail = new Schema({
  userid: String,
  firstname: String,
  lastname: String,
  age: Number,
  money: Number,
  birthdate: String,
  phone: Number,
  department: String,
  created_at: Date,
  updated_at: Date
})

module.exports = mongoose.model('users_detail_62672', userdetail)
