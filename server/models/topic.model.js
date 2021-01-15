const { mongoose } = require("./");

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 10,
    required: true,
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = { Topic };
