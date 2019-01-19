const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const db = require("./database/dbConfig");

const server = express();
server.use(cors());
server.use(express.json());
server.use(helmet());

// POST api/register

server.post("/api/register", async (req, res) => {
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;
  try {
    const user = await db("users").insert(credentials);

    res.status(201).json(user);
  } catch (err) {
    err.errno === 19
      ? res.status(400).json({ error: "Username already taken" })
      : res.status(500).json(err);
  }
});

// POST api/login

server.post("/api/login", async (req, res) => {
  const credentials = req.body;
  const { username } = req.body;

  try {
    const user = await db("users")
      .where({ username })
      .first();

    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      return res.status(401).json({ error: "You shall not pass" });
    } else {
      const users = await db("users");
      res.status(200).json(users);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET api/users

server.get("/api/users", async (req, res) => {});

const port = 5000;

server.listen(port, () => console.log(`Server up and listening on ${port}`));
