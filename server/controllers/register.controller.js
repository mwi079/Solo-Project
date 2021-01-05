const { User, userValidation} = require('../models/user.model');

async function registerUser (ctx) {
  const {name, email, password} = ctx.request.body
  const user = new User({ name, email, password });

  const { error } = userValidation({ name, email, password });
  
  if (error) {
    ctx.status = 400;
    return ctx.body = error.details[0].message
  }

  try {
    const savedUser = await user.save();
    ctx.body = savedUser;
  } catch (error) {
    ctx.status = 400;
    ctx.body(error);
  }
}

module.exports = {registerUser};
