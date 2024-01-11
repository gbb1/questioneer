const express = require("express");
const session = require('express-session')

const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const { connectDB } = require('./db');
const { testCreateUser, findUserById } = require('./db/users.js');
const { createLobby, getLobbies } = require('./db/lobby.js');

const { usersRouter, lobbyRouter } = require('./routes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

const PORT = 8089;

app.use('/api/users', usersRouter);
app.use('/api/lobby', lobbyRouter);
app.get('/api', (req, res) => {
    // res.session.id = 'Test'
    res.status(200).send({ data: "success" });
})

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// getLobbies("user_2aYhtErR5hR9vSo7Y9HDl2MZmOm")
io.on("connection", (socket) => {
  console.log(`a new user connected: ${socket.id.substr(0, 2)} `);
  // testCreateUser().then(() => console.log('Tested'));
  // createLobby('asdf')

  io.to(socket.id).emit('connection-success', socket.id);

});


server.listen(PORT, () => {
  connectDB();
  console.log(`listening on port:${PORT}`);
});

module.exports = io;
