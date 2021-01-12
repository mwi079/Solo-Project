const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// middleware function to be added to protected routes
function authorizeRoute(ctx, next) {
  const token = ctx.get("auth-token");

  if (!token) {
    ctx.status = 401; //access denied
    return (ctx.body = "Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    ctx.user = verified;
    next();
  } catch (error) {
    ctx.status = 400;
    ctx.body = "Invalid Token";
  }
}

module.exports = { authorizeRoute };
