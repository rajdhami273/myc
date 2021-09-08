const mongoose = require("../../globals/mongoose");

module.exports = () => {
  const Chat = require("./chat.model");

  return {
    async addMessage(req, res, next) {
      try {
        const chat = new Chat({ ...req.body, messageBy: req.user._id }).save();
        return res.send(await chat);
      } catch (error) {
        return next(
          await Promise.reject({
            status: 500,
            message: "Server error!",
          })
        );
      }
    },
    async getAll(req, res, next) {
      try {
        const messages = await Chat.aggregateSkipDelete([
          {
            $lookup: {
              from: mongoose.model("User").collection.collectionName,
              let: { messageBy: "$messageBy" },
              pipeline: [
                { $match: { $expr: { $eq: ["$$messageBy", "$_id"] } } },
                {
                  $project: {
                    name: 1,
                  },
                },
              ],
              as: "userDetails",
            },
          },
          {
            $unwind: "$userDetails",
          },
        ]);
        return res.send(messages);
      } catch (error) {
        return next(await error);
      }
    },
  };
};
