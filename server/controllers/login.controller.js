const { loginValidation } = require('../validation');
const {User} = require('../models/user.model');
const bcrypt = require('bcrypt');

async function loginUser (ctx) {

  const { email, password } = ctx.request.body;
  const { error } = loginValidation({email, password})

  if (error) {
    ctx.status = 400;
    return ctx.body = error.details[0].message
  }

  // Check if user is already in db
  const user = await User.findOne({ email })
  if (!user) {
    ctx.status = 400;
    return ctx.body = 'Email or password is wrong';
  }

  // Check if password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    ctx.status = 400;
    ctx.body = 'Invalid password';
  }

  ctx.body = 'You have successfully logged in!';

}

module.exports = {loginUser}