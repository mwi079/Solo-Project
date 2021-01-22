const Koa = require("koa");
const dotenv = require("dotenv");
const cors = require("@koa/cors");
const bodyparser = require("koa-bodyparser");

dotenv.config();
const app = new Koa();
const { router } = require("./routes/index.js");

app.use(cors()).use(bodyparser()).use(router.routes());

// app.listen(process.env.PORT, () =>
//   console.log(`Listening to http://localhost:${process.env.PORT} 🤓🚀`)
// );

module.exports = app.listen(process.env.PORT);
