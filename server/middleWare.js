// const express = require("express");

// const server = express();

module.exports = {
  authenticated: (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.status(401).json({ message: "you shall not pass!!" });
    }
  }
};
