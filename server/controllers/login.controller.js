const { loginValidation } = require("../validation/user_validation");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

async function loginUser(ctx) {
  const { email, password } = ctx.request.body;
  const { error } = loginValidation({ email, password });

  if (error) {
    ctx.status = 400;
    return (ctx.body = error.details[0].message);
  }

  // Check if user is already in db
  const user = await User.findOne({ email });

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

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "10h",
  });
  ctx.set("auth-token", token); //setting the token to header
  ctx.body = token;
  ctx.body = "You have successfully logged in!";
}

module.exports = { loginUser };
