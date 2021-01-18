const { mongoose } = require("./");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
  },
  surname: {
    type: String,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    min: 6,
    max: 1024,
  },
  html_url: { type: String },
  gists_url: { type: String },
  location: { type: String },
  avatar_url: { type: String },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
