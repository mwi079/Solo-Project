const Router = require('koa-router');
const loginRoute = new Router({ prefix: '/api/post' });
const authorizeRoute = require('../authorizeRoute');

loginRoute.get('/', authorizeRoute, ctx => {
  ctx.body = {
    posts: 'my first post',
    description: 'some stuff you shouldnt access'
  }
});


module.exports = loginRoute;