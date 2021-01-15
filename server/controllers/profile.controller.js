const { User } = require("../models/user.model");
const dotenv = require("dotenv");

dotenv.config();

async function getProfile(ctx) {
  try {
    // extract user info from the request
    const { _id, name, email } = ctx.user;
    const user = { _id, name, email };
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
  const { name } = ctx.request.body;

  const user = await new Promise((resolve, reject) => {
    User.findOne({ name })
      .populate("posts")
      .exec((err, user) => {
        err && reject(err);
        resolve(user.posts);
      });
  });

  ctx.body = user;
}

module.exports = { getProfile, getUserPosts };
