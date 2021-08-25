const express = require("express");
const app = express();
const mongoose = require("mongoose");
const errorlog = require("express-errorlog");
const cors = require("cors");

app.use(cors({ credentials: true }));
app.use(errorlog);

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
module.exports = app;
