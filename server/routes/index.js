const Router = require("koa-router");
const router = new Router();
const { authorizeUser } = require("../middleware/authorizeUser");
const { authorizeTopic } = require("../middleware/authorizeTopics");

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

// User login/register routes
router.post("/api/user/register", registerUser);
router.post("/api/user/login", loginUser);
router.get("/api/user/profile", authorizeUser, getProfile);

// Forum topics routes
router.get("/forum/allTopics", getAllTopics);
router.get("/forum/topic", authorizeTopic, getTopicByTitle);
router.post("/forum/post_topic", authorizeTopic, postOneTopic);
router.delete("/forum/posts", authorizeTopic, deleteOneTopic);
router.put("/forum/posts", authorizeTopic, modifyTopicTitle);

module.exports = { router };
