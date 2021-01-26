import {
  userValidation,
  loginValidation,
} from"../validation/user_validation";
import {mock} from "./mockVariables";

test.skip("should validate", () => {
  const { error } = loginValidation(mock.valid.correctLoginData);

  expect(error).toBe(undefined);
});

test.skip("should validate", () => {
  const { error } = userValidation(mock.valid.correctUserData);

  expect(error).toBe(undefined);
});

test.skip("should not validate", () => {
  const { error } = loginValidation(mock.valid.wrongLoginData);
  expect(error).toBeDefined();
});

test.skip("should not", () => {
  const { error } = userValidation(mock.valid.wrongUserData);
  expect(error).toBeDefined();
});
