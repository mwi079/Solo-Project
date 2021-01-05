const Router = require('koa-router');

const authenticationRoute = new Router({ prefix: '/api/user' });
const { registerUser } = require('../controllers/register.controller');

authenticationRoute.post('/register', registerUser)

module.exports = {authenticationRoute};