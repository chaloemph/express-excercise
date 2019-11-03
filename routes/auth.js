const jwt = require('jsonwebtoken')
const fs = require('fs')
const publicKey = fs.readFileSync('public.key')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token.split(' ')[1]
    const decode = jwt.verify(token, publicKey, { algorithms: 'RS256' })
    if (decode) {
    //   console.log(decode)
      req.username = decode.username
      next()
    }
  } catch (error) {
    res.status(401).send(error.message)
  }
}
