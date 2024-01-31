const express = require('express')
const router = express.Router();

const { createNewUser, createGuest, setUsername, findUserById } = require('../db/users.js')

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
    .then((data) => {
      console.log('data', data)
      res.send({...data, expiration: new Date().getTime() + (24 * 60 * 60 * 1000)})
    })
    .catch((err) => {
      console.log(err)
      res.send({ error: err })
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

router.post('/get-data', async (req, res) => {
  console.log(req.body)
  findUserById(req.body.id)
    .then((data) => {
      // res.session.id = id
      res.send({ data })
    })
    .catch((err) => {
      console.log(err)
      res.send({ error: err })
    })
})

module.exports = router