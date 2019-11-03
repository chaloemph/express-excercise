var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/info', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/employee', function (req, res, next) {
  res.send('post employee page')
})

module.exports = router
