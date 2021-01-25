// a helper function to validate users

export const validateSignupForm = (email: string, password: string, name: string, surname: string) => {
  return !email || !password || !name || !surname;
};

export const validateLoginForm = (email: string, password: string) => {
  return !email || !password;
};

export const validateForm = (title: string, content: string) => {
  return !title || !content;
};

// module.exports = { validateSignupForm, validateLoginForm, validateForm };
