const express = require("express");
const session = require("express-session");

const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const { connectDB } = require("./db");
const { testCreateUser, findUserById } = require("./db/users.js");
const { createLobby, getLobbies } = require("./db/lobby.js");
const { startNewGame } = require('./db/game.js')

const { usersRouter, lobbyRouter } = require("./routes");
const {
  createNewLobby,
  joinLobby,
  leaveLobby,
  leaveLobby2,
  getLobbyInfo,
} = require("./db/lobby.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

const PORT = 8089;

app.use("/api/users", usersRouter);
app.use("/api/lobby", lobbyRouter);
app.get("/api", (req, res) => {
  // res.session.id = 'Test'
  res.status(200).send({ data: "success" });
});

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// getLobbies("user_2aYhtErR5hR9vSo7Y9HDl2MZmOm")
io.on("connection", (socket) => {
  // console.log(`a new user connected: ${socket.id.substr(0, 2)} `);
  // testCreateUser().then(() => console.log('Tested'));
  // createLobby('asdf')

  io.to(socket.id).emit("connection-success", socket.id);

  /**
   * PRE GAME
   */

  socket.on("join-lobby", async ({ id, lobby_id }) => {
    console.log("try join", id, lobby_id);
    joinLobby(id, lobby_id)
      .then(async (data) => {
        socket.join(lobby_id);
        const lobby_info = await getLobbyInfo(lobby_id)
        io.to(socket.id).emit("join-success", lobby_id);
        io.to(lobby_id).emit("lobby-info", lobby_info);
      })
      .catch((err) => {
        console.log(err);
        io.to(socket.id).emit("error", "this lobby does not exist");
      });
  });

  /**
   * IN GAME
   */
  socket.on('get-lobby-info', async ({ lobby_id }) => {
    socket.join(lobby_id)
    const lobby_info = await getLobbyInfo(lobby_id)
    io.to(lobby_id).emit('lobby-info', lobby_info)
  })

  /**
   *
   */
  socket.on("leave-lobby", async ({ id, lobby_id }) => {
    leaveLobby2(id, lobby_id)
      .then(() => {
        socket.leave(lobby_id);
        io.to(socket.id).emit("lobby-left", lobby_id);
      })
      .catch((err) => {
        console.log(err);
        io.to(socket.id).emit("error", "this lobby does not exist");
      });
  });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`listening on port:${PORT}`);
});

module.exports = io;
