import Koa from 'koa'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// middleware function to be added to protected routes
export async function authorizeTopic(ctx:Koa.Context, next:()=>Promise<any>) {
  const authHeaders = ctx.request.headers["authorization"];

  if (!authHeaders) {
    ctx.status = 403; //access denied
    return (ctx.body = "Access Denied");
  }
  try {
    const _id= jwt.verify(authHeaders, process.env.TOKEN_SECRET);
    ctx.user = _id;
    await next();
  } catch (error) {
    ctx.status = 401;
    console.error(error);
    return (ctx.body = "Invalid Token");
  }
}


