module.exports = {
  authenticated: (req, res, next) => {
    if (req.session && req.session.cookie) {
      next();
    } else {
      res.status(401).json({ message: "you shall not pass!!" });
    }
  }
};
