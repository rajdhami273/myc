const authMiddleware = require("../../middlewares/auth.middleware");

const router = require("express").Router();

module.exports = function () {
  const user = require("./user.controller")();

  router.post("/register", user.register);
  router.post("/login", user.login);
  router.get("/me", authMiddleware(""), user.me);

  return router;
};
