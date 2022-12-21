const welcome = async (req, res) => {
  res.status(200).send(`Welcome ${req.user.email}`);
};
module.exports = {
  welcome,
};
