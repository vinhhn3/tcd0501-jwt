const httpStatus = require("http-status");

const welcome = async (req, res) => {
  return res.status(httpStatus.OK).send(req.user);
};
module.exports = {
  welcome,
};
