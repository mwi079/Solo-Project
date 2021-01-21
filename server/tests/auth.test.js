const { authorizeTopic } = require("../middleware/authorizeTopics");
const { authorizeUser } = require("../middleware/authorizeUser");

function sum(a, b) {
  return a + b;
}

test("should ", () => {
  expect(sum(1, 2)).toBe(3);
});

const ctx = { status: 403, body: "", request: { headers: () => false } };
const next = "whatever";

test('should return "Access Denied" is ctx.status is 403', () => {
  authorizeTopic(ctx, next);
  expect(ctx.body).toBe("Access Denied");
});

test('should return "Access Denied" is ctx.status is 403', () => {
  authorizeUser(ctx, next);
  expect(ctx.body).toBe("Access Denied");
});
