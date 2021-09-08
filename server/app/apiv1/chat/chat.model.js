const mongoose = require("../../globals/mongoose");

const ChatSchema = new mongoose.Schema(
  {
    messageBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
