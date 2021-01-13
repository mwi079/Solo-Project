const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("./models/user.model");

dotenv.config();

// middleware function to be added to protected routes
async function authorizeRoute(ctx, next) {
  const authHeaders = ctx.request.headers["authorization"];

  if (!authHeaders) {
    ctx.status = 403; //access denied
    return (ctx.body = "Access Denied");
  }

  try {
    // attempt to decode id from token payload

    const { _id } = jwt.verify(authHeaders, process.env.TOKEN_SECRET);

    // and try to find the user
    const user = await User.findOne({ _id });
    console.log("user", user);

    ctx.user = user;
    next();
  } catch (error) {
    ctx.status = 401;
    return (ctx.body = "Invalid Token");
  }
}

module.exports = authorizeRoute;
