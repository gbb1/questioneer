const express = require('express')
const router = express.Router();

const { createNewLobby, joinLobby } = require('../db/lobby.js')

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

router.post('/join-lobby', async (req, res) => {
  const { id, lobby_id } = req.body
  joinLobby(id, lobby_id)
    .then((data) => {
      res.send({ data: data })
    })
    .catch((err) => {
      console.log(err)
      res.send({ error: err })
    })
})


module.exports = router