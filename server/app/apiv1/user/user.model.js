const mongoose = require("../../globals/mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenSecret = require("../../../config").tokenSecret;
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      unique: true,
      dropDups: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

function encrypt(password) {
  return bcrypt.hashSync(password);
}
UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.methods.hashPassword = function () {
  this.password = encrypt(this.password);
};
UserSchema.methods.generateSession = function () {
  const token = jwt.sign(
    {
      user: this._id,
    },
    tokenSecret,
    {
      expiresIn: 60 * 60 * 24,
    }
  );
  return Promise.resolve({
    token,
  });
};
UserSchema.statics.getSession = function (auth, ...args) {
  return new Promise((resolve, reject) => {
    if (auth.split(" ")[0] == "Bearer") {
      jwt.verify(auth.split(" ")[1], tokenSecret, (err, decoded) => {
        if (err) {
          return reject({
            status: 403,
            message: err.message || "Invalid token",
          });
        }
        this.findById(decoded.user)
          .select("-password")
          .then((user) => {
            if (user) {
              // let accessLevel = req.headers['access-level'];
              let accessLevel = null;
              if (!accessLevel || (accessLevel == "admin" && user.isAdmin)) {
                return resolve(user);
              } else {
                return reject({
                  status: 401,
                  message: "Not allowed",
                });
              }
            } else {
              return reject({
                status: 403,
                message: "Invalid user",
              });
            }
          })
          .catch((err) => {
            return reject({
              status: 500,
              message: err.message || "Unknown error occurred",
            });
          });
      });
    } else {
      return reject({
        status: 403,
        message: "Invalid token",
      });
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
