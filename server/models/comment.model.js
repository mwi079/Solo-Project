const { mongoose } = require("./");

const commentSchema = new mongoose.Schema({
  comment: { type: String },
  count: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
