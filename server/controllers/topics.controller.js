const { Topic } = require("../models/topic.model");
const { User } = require("../models/user.model");
const { Comment } = require("../models/comment.model");

async function getAllTopics(ctx) {
  try {
    const allTopics = await Topic.find({})
      .populate({
        path: "comments",
        populate: {
          path: "author",
        },
      })
      .populate("author");
    ctx.status = 200;
    ctx.body = allTopics;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function getTopicById(ctx) {
  try {
    const { id } = ctx.request.params;
    const foundTopic = await Topic.findOne({ _id: id }).populate("author");
    ctx.status = 200;
    ctx.body = foundTopic;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function postOneTopic(ctx) {
  try {
    const { title, content, tags } = ctx.request.body;
    const _id = ctx.user;
    const user = await User.findOne({ _id });
    const topicToPost = new Topic({ title, author: _id, content, tags });
    user.posts.push(topicToPost._id);

    await topicToPost.save();
    await user.save();
    ctx.status = 200;
    ctx.body = topicToPost;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function deleteOneTopic(ctx) {
  try {
    const { _id } = ctx.request.body;
    await Topic.findByIdAndDelete({ _id });
    ctx.status = 200;
    ctx.body = "Topic successfully deleted";
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function addComment(ctx) {
  try {
    const { id } = ctx.request.params;
    const _id = ctx.user;

    const { comment } = ctx.request.body;

    const newComment = new Comment({ comment, author: _id });

    const user = await User.findOne({ _id });

    const topic = await Topic.findOne({ _id: id });
    topic.comments = [...topic.comments, newComment._id];
    await topic.save();
    await newComment.save();
    await user.save();
    ctx.status = 200;
    ctx.body = topic;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function getTopicDetails(ctx) {
  try {
    const { id } = ctx.request.params;
    const topic = await Topic.findOne({ _id: id }).populate({
      path: "comments",
      populate: {
        path: "author",
      },
    });
    const { author } = await Topic.findOne({ _id: id }).populate("author");

    ctx.status = 200;
    ctx.body = { topic, author };
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function likeTopic(ctx) {
  try {
    const { id } = ctx.request.body;
    const topicToLike = await Topic.findOne({ _id: id });
    topicToLike.likes += 1;
    await topicToLike.save();
    ctx.status = 200;
    ctx.body = topicToLike;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function dislikeTopic(ctx) {
  try {
    const { id } = ctx.request.body;
    const topicToLike = await Topic.findOne({ _id: id });
    topicToLike.likes -= 1;
    await topicToLike.save();
    ctx.status = 200;
    ctx.body = topicToLike;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

module.exports = {
  getAllTopics,
  getTopicById,
  postOneTopic,
  deleteOneTopic,
  addComment,
  getTopicDetails,
  likeTopic,
  dislikeTopic,
};
