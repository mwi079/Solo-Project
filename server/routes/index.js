const Router = require('koa-router');

const router = new Router({ prefix: '/api/user' });
// const loginRoute = new Router({ prefix: '/api/user' });

const { registerUser } = require('../controllers/register.controller');
const { loginUser } = require('../controllers/login.controller');

router.post('/register', registerUser);
router.post('/login', loginUser)

module.exports = {router};