var express = require('express')
var router = express.Router()

const Student = require('../models/students')
// var dataimp = require('../data/data')
// var student = dataimp.students

/* GET home page. */
router.get('/info', function (req, res, next) {
  Student.find({}, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
})

module.exports = router
