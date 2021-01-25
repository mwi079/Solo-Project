import Koa from 'koa'
import { User } from "../models/user.model";
import { userValidation } from "../validation/user_validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

async function registerUser(ctx:Koa.Context) {
  const { name, surname, email, password } = ctx.request.body;
  let tempUser:object= {name, surname, email, password}
  const { error } = userValidation(tempUser);

  if (error) {
    ctx.status = 400;
    return (ctx.body = error.details[0].message);
  }

  // Check if user is already in db
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    ctx.status = 400;
    return (ctx.body = "Email already exists");
  }

  // Hash password:
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ name, email, surname, password: hashedPassword });

  try {
    const { _id } = await user.save();
    const accessToken = jwt.sign({ _id }, process.env.TOKEN_SECRET);
    ctx.status = 200;
    ctx.body = accessToken;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function registerUserGithub(ctx:Koa.Context) {
  const {
    name,
    surname,
    email,
    avatar_url,
    gists_url,
    html_url,
    location,
  } = ctx.request.body;

  // Check if user is already in db
  if (/\s/g.test(name)) {
    let [firstName, surname] = name.split(" ");
    //eslint-disable-next-line
    const user = new User({
      name: firstName,
      surname,
      email,
      avatar_url,
      gists_url,
      html_url,
      location,
    });
  }

  const user = new User({
    name,
    surname,
    email,
    avatar_url,
    gists_url,
    html_url,
    location,
  });

  try {
    const { _id } = await user.save();
    const accessToken = jwt.sign({ _id }, process.env.TOKEN_SECRET);
    ctx.status = 200;
    ctx.body = accessToken;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

// github auth
async function authGithub(ctx:Koa.Context, next:Koa.Middleware) {
  try {
    const { code } = ctx.request.body;

    const tokenResponse = await axios
      .post(
        `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`
      )
      .then((res) => res.data)
      .catch((error) => console.error(error));

    const token = tokenResponse.slice(13, 53);

    ctx.status = 200;
    ctx.token = token;
    await next();
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

async function getGitHubCredentials(ctx:Koa.Context) {
  try {
    const token = ctx.token;
    const user = await axios
      .get(`https://api.github.com/user`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => res.data)
      .catch((error) => console.error(error));
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.response.statusText;
  }
}

async function getGitHubGists(ctx:Koa.Context) {
  try {
    const token = ctx.token;
    const gists = await axios
      .get(`https://api.github.com/gists`, {
        headers: { Authorization: `token ${token}` },
      })
      .then((res) => res.data);

    ctx.status = 200;
    ctx.body = gists;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.response.statusText;
  }
}

module.exports = {
  registerUser,
  authGithub,
  getGitHubCredentials,
  registerUserGithub,
  getGitHubGists,
};
