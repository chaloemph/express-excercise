const mongoose = require('mongoose')
const Schema = mongoose.Schema
const user = new Schema({
  username: String,
  password: String,
  createdatetime: Date
})

module.exports = mongoose.model('users_62672', user)
