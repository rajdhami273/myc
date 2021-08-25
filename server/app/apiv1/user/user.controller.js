module.exports = () => {
  const User = require("./user.model");

  return {
    async register(req, res, next) {
      console.log(req.body);
      const { username, email, password } = req.body;
      try {
        if (!(username && email && password)) {
          return next(
            await Promise.reject({
              status: 400,
              message: `Username/Email/Password not provided!`,
            })
          );
        }
        const user = new User(req.body);
        user.hashPassword();
        return res.send(await user.save());
      } catch (error) {
        return next(await error);
      }
    },
    async login(req, res, next) {
      const { user, password } = req.body;
      if (!(user && password)) {
        return next(
          await Promise.reject({
            status: 400,
            message: "Username/Email or Password not provided!",
          })
        );
      }
      try {
        const userDoc = await User.findOne({
          $or: [
            { username: user },
            { email: { $regex: new RegExp("^" + user + "$", "i") } },
          ],
        });
        if (userDoc) {
          if (userDoc.comparePasswords(password)) {
            return res.send(await userDoc.generateSession());
          }
          return next(
            await Promise.reject({ status: 400, message: "Wrong password!" })
          );
        } else {
          return next(
            await Promise.reject({ message: "User not found!", status: 404 })
          );
        }
      } catch (error) {
        return next(await error);
      }
    },
    async me(req, res, next) {
      if (!req.user) {
        return next(
          await Promise.reject({
            status: 404,
            message: `User not found`,
          })
        );
      }
      return res.send(await req.user);
    },
  };
};
