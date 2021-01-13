const { User } = require("../models/user.model");
const { userValidation } = require("../validation/user_validation");
const bcrypt = require("bcrypt");

async function registerUser(ctx) {
  const { name, email, password } = ctx.request.body;
  const { error } = userValidation({ name, email, password });

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

  const user = new User({ name, email, password: hashedPassword });

  try {
    await user.save();
    ctx.body = savedUser;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
}

module.exports = { registerUser };
