import { authorizeTopic } from "../middleware/authorizeTopics";
import { authorizeUser } from "../middleware/authorizeUser";
const { auth } = require("./mockVariables");

test.skip('should return "Access Denied" is ctx.status is 403', () => {
  authorizeTopic(auth.ctxError, auth.next);
  expect(auth.ctxError.body).toBe("Access Denied");
});

test.skip('should return "Access Denied" is ctx.status is 403', () => {
  authorizeUser(auth.ctxError, auth.next);
  expect(auth.ctxError.body).toBe("Access Denied");
});
