const express = require("express");

const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { connectDB } = require('./db');
const { testCreateUser } = require('./db/users.js');

const PORT = 8089;

app.get('/api', (req, res) => {
    res.status(200).send({ data: "success" });
})

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`a new user connected: ${socket.id.substr(0, 2)} `);
  testCreateUser().then(() => console.log('Tested'));

  io.to(socket.id).emit('connection-success', socket.id);

});


server.listen(PORT, () => {
  connectDB();
  console.log(`listening on port:${PORT}`);
});

module.exports = io;
