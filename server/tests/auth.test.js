const { authorizeTopic } = require("../middleware/authorizeTopics");
const { authorizeUser } = require("../middleware/authorizeUser");
const { auth } = require("./mocks");

console.log(auth);

test('should return "Access Denied" is ctx.status is 403', () => {
  authorizeTopic(auth.ctxError, auth.next);
  expect(auth.ctxError.body).toBe("Access Denied");
});

test('should return "Access Denied" is ctx.status is 403', () => {
  authorizeUser(auth.ctxError, auth.next);
  expect(auth.ctxError.body).toBe("Access Denied");
});
