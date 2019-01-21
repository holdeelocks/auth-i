const express = require("express");
// const bcrypt = require("bcryptjs");
const db = require("./database/dbConfig");

const router = express.Router();

// GET api/users

router.get("/users", async (req, res) => {
  try {
    const users = await db("users");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Unable to reach server" });
  }
});

module.exports = router;
