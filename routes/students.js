var express = require('express')
var router = express.Router()
const Student = require('../models/students')
// var dataimp = require('../data/data')
// var student = dataimp.students

/* GET home page. */
router.get('/', async (req, res, next) => {
  // Student.find({}, (err, result) => {
  //   if (err) throw err
  //   console.log(result)
  //   res.send(result)
  // })
  // find with use Params from client or url  ->  /?empid=62672
  if (req.query.empid) {
    const students = await Student.findOne({
      empid: req.query.empid
    })
    res.send(students)
  } else {
    const students = await Student.find()
    res.send(students)
  }
})

router.get('/info/:empid', async (req, res, next) => {
  // Student.find({}, (err, result) => {
  //   if (err) throw err
  //   console.log(result)
  //   res.send(result)
  // })
  const students = await Student.findOne({
    // http://localhost:5000/students/info/62672/
    empid: req.params.empid
  })
  res.send(students)
})

router.post('/addstudent', async (req, res, next) => {
  try {
    const { empid, firstname, lastname } = req.body
    const newstudent = new Student({
      empid: empid,
      firstname: firstname,
      lastname: lastname,
      createdatetime: new Date()
    })
    await newstudent.save()
    res.send({ message: 'create success' })
  } catch (error) {
    console.log(error)
  }
})

router.put('/edit', async (req, res, next) => {
  try {
    await Student.findOneAndUpdate({
      empid: req.query.empid
    }, {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname
      }
    })
    res.send('update success')
  } catch (err) {
    next(err)
  }
})

router.delete('/delete', async (req, res, next) => {
  try {
    await Student.deleteOne({
      empid: req.query.empid
    })
    res.send('delete success')
  } catch (error) {
    next(error)
  }
})

module.exports = router
