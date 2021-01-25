
const { User } = require("../models/user.model");
const dotenv = require("dotenv");

dotenv.config();

async function getGithubProfile(ctx) {
  try {
    // extract user info from the request
    const {
      name,
      surname,
      email,
      avatar_url,
      gists_url,
      html_url,
      location,
    } = ctx.user;
    const user = {
      name,
      surname,
      email,
      avatar_url,
      gists_url,
      html_url,
      location,
    };
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      error,
      message: "Resource not found",
    };
  }
}

async function getProfile(ctx) {
  try {
    // extract user info from the request
    const { _id, name, surname, email } = ctx.user;
    const user = { _id, name, surname, email };
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      error,
      message: "Resource not found",
    };
  }
}

async function getUserPosts(ctx) {
  const _id = ctx.user;
  try {
    const user = await User.findOne({ _id }).populate("posts");
    ctx.body = user;
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(ctx) {
  try {
    const { _id } = ctx.request.body;
    const user = User.findOne({ _id });
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      error,
      message: "Resource not found",
    };
  }
}

module.exports = { getProfile, getUserPosts, getUserById, getGithubProfile };
