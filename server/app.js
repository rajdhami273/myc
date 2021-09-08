const express = require("express");
const app = express();
const server = require("http").Server(app);
const mongoose = require("mongoose");
const errorlog = require("express-errorlog");
const cors = require("cors");

app.use(cors({ credentials: true }));
app.use(errorlog);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("Connected");
  // console.log(socket);
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
  socket.on("new-message", (socket) => {
    io.emit("new-message");
  });
});

mongoose
  .connect(require("./config").serverURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((mongooseInstance) => {
    console.log("Connected to mongoDB!");
    app.use(
      "/api/v1",
      express.urlencoded({ limit: "50mb", extended: true }),
      express.json(),
      require("./app/apiv1/routeGroups")(mongooseInstance)
    );
    app.use(function (err, req, res, next) {
      // Place to add error logger
      console.log(new Date().toString() + ":: " + JSON.stringify(err));
      res.status(err.status || 500).send({ message: err.message });
    });
  })
  .catch((err) => {
    console.log("Failed to connect to mongodb", err.message);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("Hello to MYC!");
});
module.exports = server;
