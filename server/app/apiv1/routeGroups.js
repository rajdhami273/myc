const router = require("express").Router();

module.exports = function (mongoose) {
  router.use("/user", require("./user/user.routes")());
  router.use("/chat", require("./chat/chat.routes")());
  return router;
};
