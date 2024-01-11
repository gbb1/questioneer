const express = require('express')
const router = express.Router();

const { createNewLobby } = require('../db/lobby.js')

router.post('/new-lobby', async (req, res) => {
  createNewLobby(req.body.id)
    .then((data) => {
      res.send({ lobby: data })
    })
    .catch((err) => {
      console.log(err)
      res.send({ error: err })
    })

})


module.exports = router