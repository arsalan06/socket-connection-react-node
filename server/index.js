const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  // if we have cors issue we can add cors obj
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User is connected ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`This user is connected ${socket.id} with this room ${data}`);
  });
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.roomId).emit("receive_message", data);
  });
  socket.on("disconnected", () => {
    console.log("This user has been disconnected", socket.id);
  });
});
server.listen(4000, () => {
  console.log("server is running");
});
