const mongoose = require("mongoose");

mongoose.plugin(require("mongoose-delete"), { overrideMethods: "all" });
mongoose.plugin((schema) => {
  schema.statics.aggregateSkipDelete = function (arr) {
    const newarr = arr || [];
    return this.aggregate([{ $match: { deleted: false } }, ...newarr]);
  };
});

module.exports = mongoose;
