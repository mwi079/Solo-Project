const {
  userValidation,
  loginValidation,
} = require("../validation/user_validation");
const { valid } = require("./mockVariables");

test.skip("should validate", () => {
  const { error } = loginValidation(valid.correctLoginData);

  expect(error).toBe(undefined);
});

test.skip("should validate", () => {
  const { error } = userValidation(valid.correctUserData);

  expect(error).toBe(undefined);
});

test.skip("should not validate", () => {
  const { error } = loginValidation(valid.wrongLoginData);
  //console.log(error);
  expect(error).toBeDefined();
});

test.skip("should not", () => {
  const { error } = userValidation(valid.wrongUserData);
  //console.log(error);
  expect(error).toBeDefined();
});
