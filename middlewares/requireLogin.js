module.exports = (req, res, next) => {
  //next is function we call when middleware is done
  if (!req.user) {
    return res.status(401).send({ error: "Please login" });
  }
  next();
};
