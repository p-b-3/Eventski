module.exports = (req, res, next) => {
  //next is function we call when middleware is done
  if (req.user.credits < 1) {
    return res
      .status(403)
      .send({ error: "Please add credits to your account" });
  }
  next();
};
