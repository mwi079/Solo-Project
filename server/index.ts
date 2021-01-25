import Koa from "koa";
import dotenv from "dotenv"
import cors from "@koa/cors"
import bodyparser from "koa-bodyparser"


dotenv.config();
const app = new Koa();
const { router } = require("./routes/index.ts");

app.use(cors()).use(bodyparser()).use(router.routes());

module.exports = app.listen(process.env.PORT);
