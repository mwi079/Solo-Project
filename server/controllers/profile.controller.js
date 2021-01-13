async function getProfile(ctx) {
  try {
    // extract user info from the request
    const { _id, name, email } = ctx.user;
    const user = { _id, name, email };
    ctx.status = 200;
    console.log(user, "user");
    ctx.body = user;
  } catch (error) {
    ctx.status = 401;
    ctx.body = {
      error,
      message: "Resource not found",
    };
  }
}

module.exports = { getProfile };
