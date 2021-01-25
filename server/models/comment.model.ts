import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  comment: { type: String },
  count: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // post: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
