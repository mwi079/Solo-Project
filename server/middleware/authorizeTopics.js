const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models/user.model");

dotenv.config();

// middleware function to be added to protected routes
async function authorizeTopic(ctx, next) {
  const authHeaders = ctx.request.headers["authorization"];

  if (!authHeaders) {
    ctx.status = 403; //access denied
    return (ctx.body = "Access Denied");
  }
  try {
    const { _id } = jwt.verify(authHeaders, process.env.TOKEN_SECRET);

    ctx.user = _id;
    await next();
  } catch (error) {
    ctx.status = 401;
    console.error(error);
    return (ctx.body = "Invalid Token");
  }
}

module.exports = { authorizeTopic };
