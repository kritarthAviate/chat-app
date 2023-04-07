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

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
//Add this before the app.get() block
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
