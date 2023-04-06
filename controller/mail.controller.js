let controller = {};
const mailService = require("../services/mail.service");
const { successHandler, errorHandler } = require("../utils/responseHandler");
controller.test = async (req, res) => {
  return res.status(200).json({
    message: "success",
  });
};

controller.readMailBox = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const code = await mailService.getEmails({ email, pass });
    return successHandler(res, { code });
  } catch (err) {
    console.log("err", err);
    return errorHandler(res, err)
  }
};


controller.checkLive = async (req, res) => {
  const { email, pass } = req.body;
  try {
     await mailService.checkLive({ email, pass });
    return successHandler(res, { live: true });
  } catch (err) {
    console.log("err", err);
    return errorHandler(res, err)
  }
};


module.exports = controller;
