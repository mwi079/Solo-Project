import Koa from 'koa'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model";
dotenv.config();

// middleware function to be added to protected routes
export async function authorizeUser(ctx:Koa.Context, next:()=>Promise<any>) {
  const authHeaders = ctx.request.headers["authorization"];
  if (!authHeaders) {
    ctx.status = 403; //access denied
    return (ctx.body = "Access Denied");
  }

  try {
    // attempt to decode id from token payload
    const  _id  = jwt.verify(authHeaders, process.env.TOKEN_SECRET);
    // and try to find the user
    const user = await User.findOne({ _id });

    ctx.user = user;
    ctx.body = ctx.request.body;
    next();
  } catch (error) {
    ctx.status = 401;
    return (ctx.body = "Invalid Token");
  }
}

module.exports = { authorizeUser };
