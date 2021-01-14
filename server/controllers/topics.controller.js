const { Topic } = require("../models/topic.model");

async function getAllTopics(ctx) {
  try {
    const allTopics = await Topic.find({});
    ctx.status = 200;
    ctx.body = allTopics;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function getTopicByTitle(ctx) {
  try {
    const { title } = ctx.request.body;
    const foundTopic = await Topic.findOne({ title });
    ctx.status = 200;
    ctx.body = foundTopic;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function postOneTopic(ctx) {
  try {
    const { title, author, content, tags } = ctx.request.body;
    const topicToPost = new Topic({ title, author, content, tags });
    ctx.status = 200;
    ctx.body = topicToPost;
    await topicToPost.save();
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function deleteOneTopic(ctx) {
  try {
    const { title } = ctx.request.body;
    await Topic.findOneAndRemove({ title });
    ctx.status = 200;
    ctx.body = "Topic successfully deleted";
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

async function modifyTopicTitle(ctx) {
  try {
    const { title, newTitle } = ctx.request.body;
    const modifiedTopic = await Topic.findOneAndUpdate(
      { title },
      { title: newTitle },
      {
        new: true,
      }
    );
    ctx.status = 200;
    ctx.body = modifiedTopic;
  } catch (error) {
    ctx.status = 400;
    console.error(error);
  }
}

module.exports = {
  getAllTopics,
  getTopicByTitle,
  postOneTopic,
  deleteOneTopic,
  modifyTopicTitle,
};
