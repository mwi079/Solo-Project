import {loginValidation} from "../validation/user_validation";
import {User} from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Koa from 'koa'
import {Iuser} from '../models/user.model'


export async function loginUser(ctx:Koa.Context) {
  const { email, password } = ctx.request.body;
  const { error } = loginValidation({email,password});
  if (error) ctx.body = error.details[0].message;

  try {
    const user:Iuser = await User.findOne({ email });
    if (!user) {
      ctx.status = 400;
      return (ctx.body = "Email or password is wrong");
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      ctx.status = 400;
      ctx.body = "Invalid password";
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "24h",
    });
    ctx.body = token;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }

}

