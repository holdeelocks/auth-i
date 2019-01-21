const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../database/dbConfig");

const router = express.Router();

// POST api/register

router.post("/", async (req, res) => {
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

module.exports = router;
