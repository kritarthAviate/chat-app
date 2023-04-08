const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
const http = require("http").Server(app);

const PORT = process.env.PORT || 8080;

dotenv.config();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
const corsOptions = {
  credentials: true,
  origin: true,
  allowedHeaders: "content-type, origin, accept,",
  methods: "GET,POST,PUT",
};
app.use(cors(corsOptions));

// init socket.io
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const users = {};
const rooms = {};

// socket connection handler
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data, room) => {
    console.log({ users, rooms });
    console.log({ data });
    socketIO.to(room).emit("messageResponse", data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));
  socket.on("stopTyping", () => socket.broadcast.emit("stopTypingResponse"));

  // socket.on("newUser", (data) => {
  //   users.push(data);
  //   socketIO.emit("newUserResponse", users);
  // });

  socket.on("createRoom", (data, room) => {
    console.log("🚀: createRoom", { data });
    console.log({ users, rooms });
    socket.join(room);
    rooms[room] = [data];
    users[data.socketID] = room;
    socketIO.to(room).emit("createRoomResponse", rooms[room]);
  });

  socket.on("joinRoom", (data, room) => {
    console.log("🚀: joinRoom", { data });
    console.log({ users, rooms });
    socket.join(room);
    // if(data.socketID in users) return;
    let roomUsers = rooms[room] || [];
    rooms[room] = [...roomUsers, data];
    users[data.socketID] = room;
    socketIO.to(room).emit("joinRoomResponse", rooms[room]);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    user = socket.id;
    if (user in users) {
      const roomId = users[user];
      let room = rooms[roomId] || [];
      console.log({ room, user }, "from disconnect");
      delete users[user];
      if (room?.length) {
        room = room.filter((_user) => _user.socketID !== user);
        console.log({ room, user }, "from disconnect2");
        rooms[roomId] = room;
        socketIO.to(room).emit("userLeft", room);
      }
    }
    socket.disconnect();
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
