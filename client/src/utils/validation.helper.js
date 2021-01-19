// a helper function to validate users

const validateSignupForm = (email, password, name, surname) => {
  return !email || !password || !name || !surname;
};

const validateLoginForm = (email, password) => {
  return !email || !password;
};

module.exports = { validateSignupForm, validateLoginForm };
