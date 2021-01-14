const { mongoose } = require("./");
const { User } = require("./user.model");

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 10,
    required: true,
  },
  author: {
    type: String,
  },
  content: {
    type: String,
    min: 50,
    max: 1050,
    required: true,
  },
  replies: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Topic = mongoose.model("forum_topics", topicSchema);

module.exports = { Topic };
