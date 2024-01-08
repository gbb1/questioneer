const express = require('express')
const router = express.Router();

const { createNewUser, createGuest, setUsername } = require('../db/users.js')

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

router.post('/new-guest', async (req, res) => {
  createGuest(req.body)
    .then((id) => {
      // res.session.id = id
      res.send({ action: 'Guest created' })
    })
    .catch((err) => {
      console.log(err)
      res.send({ action: 'Existing user' })
    })
})


router.post('/set-username', async (req, res) => {
  setUsername(req.body)
    .then((id) => {
      // res.session.id = id
      res.send({ action: 'Guest created' })
    })
    .catch((err) => {
      console.log(err)
      res.send({ action: 'Existing user' })
    })
})

module.exports = router