// middleware function to be added to protected routes
async function authorizeTopic(ctx, next) {
  const authHeaders = ctx.request.headers["authorization"];
  const { title, author, content } = ctx.request.body;
  const topic = { title, author, content };

  if (!authHeaders) {
    ctx.status = 403; //access denied
    return (ctx.body = "Access Denied");
  }
  try {
    ctx.body = topic;
    next();
  } catch (error) {
    ctx.status = 401;
    return (ctx.body = "Invalid Token");
  }
}

module.exports = { authorizeTopic };
