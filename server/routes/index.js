const Router = require("koa-router");
const router = new Router();
// const { authorizeRoute } = require("../authorizeRoute");

const { registerUser } = require("../controllers/register.controller");
const { loginUser } = require("../controllers/login.controller");
const { getProfile } = require("../controllers/profile.controller");
const {
  getAllTopics,
  getTopicByTitle,
  postOneTopic,
  deleteOneTopic,
  modifyTopicTitle,
} = require("../controllers/topics.controller");
const authorizeRoute = require("../authorizeRoute");

// User login/register routes
router.post("/api/user/register", registerUser);
router.post("/api/user/login", loginUser);
router.get("/api/user/profile", authorizeRoute, getProfile);

// Forum topics routes
router.get("/forum/allTopics", getAllTopics);
router.get("/forum/topic", getTopicByTitle);
router.post("/forum/posts", postOneTopic);
router.delete("/forum/posts", deleteOneTopic);
router.put("/forum/posts", modifyTopicTitle);

module.exports = { router };
