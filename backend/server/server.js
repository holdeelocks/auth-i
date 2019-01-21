const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");

const loginRouter = require("./routes/loginRouter");
const restrictedRouter = require("./routes/restrictedRouter");
const registerRouter = require("./routes/registerRouter");
const { authenticated } = require("./middleWare");

const server = express();

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

server.use("/api/restricted", authenticated, restrictedRouter);
server.use("/api/login", loginRouter);
server.use("/api/register", registerRouter);

module.exports = server;
