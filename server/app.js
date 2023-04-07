const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();

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

module.exports = app;
