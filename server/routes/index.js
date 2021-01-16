const Router = require("koa-router");
const router = new Router();
const { authorizeUser } = require("../middleware/authorizeUser");
const { authorizeTopic } = require("../middleware/authorizeTopics");

const { registerUser } = require("../controllers/register.controller");
const { loginUser } = require("../controllers/login.controller");
const {
  getProfile,
  getUserPosts,
} = require("../controllers/profile.controller");
const {
  getAllTopics,
  getTopicById,
  postOneTopic,
  deleteOneTopic,
  addComment,
  getTopicComments,
} = require("../controllers/topics.controller");

// User login/register routes
router.post("/api/user/register", registerUser);
router.post("/api/user/login", loginUser);
router.get("/api/user/profile", authorizeUser, getProfile);

// Forum topics routes
router.get("/forum/allTopics", getAllTopics);
router.get("/forum/topic/:id", getTopicById);
router.get("/forum/user_topics", authorizeTopic, getUserPosts);
router.post("/forum/post_topic", authorizeTopic, postOneTopic);
router.delete("/forum/delete", authorizeTopic, deleteOneTopic);
router.put("/forum/comment/:id", authorizeTopic, addComment);
router.get("/forum/topic_comments/:id", authorizeTopic, getTopicComments);

module.exports = { router };
