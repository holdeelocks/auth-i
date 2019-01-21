const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./database/dbConfig");

const router = express.Router();

// POST api/register

router.post("/register", async (req, res) => {
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

router.post("/login", async (req, res) => {
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
      if (users) {
        req.session.name = "login";
        res.status(200).json({ message: "Logged in", cookie: session.userId });
      }
      // res.status(200).json(users);
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
