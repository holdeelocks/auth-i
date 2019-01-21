const express = require("express");
// const bcrypt = require("bcryptjs");
// const db = require("./database/dbConfig");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const restrictedRouter = require("./routes/restrictedRouter");
const authRouter = require("./routes/authRouter");
const { authenticated } = require("./middleWare");

const server = express();
server.use("/api/restricted", authenticated, restrictedRouter);
server.use("/api", authRouter);

server.use(cors());
server.use(express.json());
server.use(helmet());
server.use(
  session({
    name: "notsession",
    secret: "nobody tosses a dwarf!",
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false
  })
);

module.exports = server;
