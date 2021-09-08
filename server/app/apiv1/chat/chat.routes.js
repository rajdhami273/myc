const authMiddleware = require("../../middlewares/auth.middleware");

const router = require("express").Router();

module.exports = function () {
  const chat = require("./chat.controller")();

  router.get("/all", authMiddleware(""), chat.getAll);
  router.post("/add-message", authMiddleware(""), chat.addMessage);

  return router;
};
