const mongoose = require("mongoose");

mongoose.plugin(require("mongoose-delete"), { overrideMethods: "all" });
mongoose.plugin((schema) => {
  schema.statics.aggregateSkipDelete = function(arr) {
    arr = arr || [];
    return this.aggregate([
        {
            $match: {
                deleted: false
            }
        },
        ...arr
    ]);
}
});

module.exports = mongoose;
