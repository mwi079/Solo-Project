const { loginValidation } = require("../validation/user_validation");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

async function loginUser(ctx) {
  const { email, password } = ctx.request.body;
  const { error } = loginValidation({ email, password });
  if (error) ctx.body = error.details[0].message;

  try {
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
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    ctx.body = token;
  } catch (error) {
    ctx.status = 400;
    return (ctx.body = error);
  }

  // ctx.set("token", token);
}

module.exports = { loginUser };
