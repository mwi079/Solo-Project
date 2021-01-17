const { Topic } = require("../models/topic.model");
const { User } = require("../models/user.model");
const { Comment } = require("../models/comment.model");

async function getAllTopics(ctx) {
  try {
    const allTopics = await Topic.find({}).populate("author");
    ctx.status = 200;
    ctx.body = allTopics;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
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
    console.error(error);
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
    console.error(error);
  }
}

async function deleteOneTopic(ctx) {
  try {
    console.log(ctx.request.body);
    const { _id } = ctx.request.body;
    const deletedTopic = await Topic.findByIdAndDelete({ _id });
    console.log(deletedTopic);
    ctx.status = 200;
    ctx.body = "Topic successfully deleted";
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function addComment(ctx) {
  try {
    const { id } = ctx.request.params;
    const _id = ctx.user;

    const { comment } = ctx.request.body;

    const newComment = new Comment({ comment, count: 1, author: _id });

    const user = await User.findOne({ _id });

    const topic = await Topic.findOne({ _id: id });
    topic.comments = [...topic.comments, newComment._id];
    await topic.save();
    await newComment.save();
    await user.save();
    ctx.status = 200;
    // ctx.body = user;
    ctx.body = topic;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function getTopicComments(ctx) {
  try {
    const { id } = ctx.request.params;
    const { comments } = await Topic.findOne({ _id: id }).populate({
      path: "comments",
      populate: {
        path: "author",
      },
    });
    ctx.status = 200;
    ctx.body = comments;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

module.exports = {
  getAllTopics,
  getTopicById,
  postOneTopic,
  deleteOneTopic,
  addComment,
  getTopicComments,
};
