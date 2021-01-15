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

// async function getUserPosts(ctx) {
//   const { _id } = ctx.user;
//   // console.log("user Id", _id);

//   const res = new Promise((resolve, reject) => {
//     User.findOne({ _id })
//       .populate("posts")
//       .exec((err, user) => {
//         err && reject(err);
//         console.log("user", user);
//         resolve(user.posts);
//       });
//   });
//   ctx.body = res;
//   // console.log("posts", posts);
//   // ctx.body = posts;
// }

async function getUserPosts(ctx) {
  const _id = ctx.user;
  // const { name } = ctx.request.body;

  try {
    const user = await User.findOne({ _id }).populate("posts");
    ctx.body = user;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getProfile, getUserPosts };
