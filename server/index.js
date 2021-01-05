const Koa = require('koa');
const PORT = 3500;
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();

app
  .use(cors())
  .use(bodyparser())
  .use(router.routes())

app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT} 🤓🚀`));
