// const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// // const bcrypt = require("bcryptjs");
// // const db = require("./database/dbConfig");
// const session = require("express-session");
const server = require("./server/server");

// const server = express();
// server.use(cors());
// server.use(express.json());
// server.use(helmet());
// server.use(
//   session({
//     name: "notsession",
//     secret: "nobody tosses a dwarf!",
//     cookie: {
//       maxAge: 1 * 24 * 60 * 60 * 1000,
//       secure: true
//     },
//     httpOnly: true,
//     resave: false,
//     saveUninitialized: false
//   })
// );

const port = 5000;

server.listen(port, () => console.log(`Server up and listening on ${port}`));
