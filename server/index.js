const express = require("express");

const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8089;

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`a new user connected: ${socket.id.substr(0, 2)} `);

  io.to(socket.id).emit('connection-success', socket.id);

});

server.get('/api', (req, res) => {
    res.status(200).send({ data: "success" });
})

server.listen(PORT, () => {
  console.log(`listening on port:${PORT}`);
});

module.exports = io;
