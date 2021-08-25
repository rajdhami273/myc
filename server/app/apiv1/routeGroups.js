const router = require("express").Router();

module.exports = function (mongoose) {
  router.use("/user", require("./user/user.routes")());
  return router;
};
