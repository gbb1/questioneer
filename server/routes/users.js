const express = require('express')
const router = express.Router();

const { createNewUser } = require('../db/users.js')

router.post('/new-user', async (req, res) => {
  createNewUser(req.body)
    .then(() => {
      res.send({ action: 'User created' })
    })
    .catch((err) => {
      console.log(err)
      res.send({ action: 'Existing user' })
    })
})

module.exports = router