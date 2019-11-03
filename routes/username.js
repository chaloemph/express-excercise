var express = require('express')
var router = express.Router()
const Username = require('../models/user')
const Userdetail = require('../models/userdetail')
const Userskill = require('../models/skill')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var fs = require('fs')
var auth = require('./auth')

var privateKey = fs.readFileSync('private.key')

router.post('/register', async (req, res, next) => {
  const chk = await Username.findOne({ username: req.body.username })
  if (!chk) {
    const hash = bcrypt.hashSync(req.body.password, 1)
    const newuser = new Username({
      username: req.body.username,
      password: hash,
      createdatetime: new Date()
    })
    await newuser.save()
    res.status(201).send('Register user success')
  } else {
    res.status(201).send('has user please change username or login')
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const user = await Username.findOne({
      username: req.body.username
    })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({
          username: user.username
        }, privateKey, { algorithm: 'RS256', expiresIn: 60 * 60 })
        res.send({
          msg: 'login success',
          token: token
        })
      } else {
        res.status(401).send('password invalid')
      }
    } else {
      res.status(401).send('username invalid')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/users', auth, async (req, res, next) => {
  try {
    if (req.query.userid) {
      var userdetail = await Userdetail.findOne({
        userid: req.query.userid
      })
      res.send(userdetail)
    } else {
      const userdetail = await Userdetail.find()
      const userskill = await Userskill.find()

      const newarr = userdetail.map(item => {
        item._doc.skill = []
        userskill.forEach(i => {
          if (i.userid === item.userid) {
            item._doc.skill.push(i)
          }
        })
        // var obj = {
        //   ...item
        // }
        return item
      })

      res.send(newarr)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/users', auth, async (req, res, next) => {
  try {
    const user = await Username.findOne({ username: req.username })
    const newusersdetail = new Userdetail({
      userid: user._id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      money: req.body.money,
      birthdate: req.body.birthdate,
      phone: req.body.phone,
      department: req.body.department,
      created_at: new Date(),
      updated_at: new Date()
    })
    await newusersdetail.save()
    res.status(201).send('Add user detail success')
  } catch (err) {
    next(err)
  }
})

router.put('/users', auth, async (req, res, next) => {
  try {
    const user = await Username.findOne({ username: req.username })
    await Userdetail.findOneAndUpdate({
      userid: user.id
    }, {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        money: req.body.money,
        birthdate: req.body.birthdate,
        phone: req.body.phone,
        department: req.body.department,
        updated_at: new Date()
      }
    })
    res.status(201).send('Update user detail success')
  } catch (err) {
    next(err)
  }
})

router.delete('/users', auth, async (req, res, next) => {
  try {
    const user = await Username.findOne({ username: req.username })
    await Userdetail.findOneAndDelete({ userid: user.id })
    res.status(201).send('Delete user detail success')
  } catch (err) {
    next(err)
  }
})

router.get('/skills', auth, async (req, res, next) => {
  try {
    if (req.query.language && req.query.level) {
      const userskill = await Userskill.find({
        language: req.query.language,
        level: req.query.level
      })
      res.send(userskill)
    } else if (req.query.language) {
      const userskill = await Userskill.find({
        language: req.query.language
      })
      res.send(userskill)
    } else if (req.query.level) {
      const userskill = await Userskill.find({
        level: req.query.level
      })
      res.send(userskill)
    } else {
      const userskill = await Userskill.find()
      res.send(userskill)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/skills', auth, async (req, res, next) => {
  try {
    const user = await Username.findOne({ username: req.username })
    const newuserskill = new Userskill({
      userid: user._id,
      language: req.body.language,
      level: req.body.level,
      created_at: new Date(),
      updated_at: new Date()
    })
    await newuserskill.save()
    res.status(201).send('Add skill success')
  } catch (err) {
    next(err)
  }
})

router.put('/skills', auth, async (req, res, next) => {
  try {
    const user = await Username.findOne({ username: req.username })

    await Userskill.findOneAndUpdate({
      userid: user.id
    }, {
      $set: {
        userid: user._id,
        language: req.body.language,
        level: req.body.level,
        updated_at: new Date()
      }
    })
    res.status(201).send('Updated skill success')
  } catch (err) {
    next(err)
  }
})

router.delete('/skills', auth, async (req, res, next) => {
  try {
    const user = await Username.findOne({ username: req.username })
    await Userskill.findOneAndDelete({ userid: user.id })
    res.status(201).send('Delete skill success')
  } catch (err) {
    next(err)
  }
})

module.exports = router
