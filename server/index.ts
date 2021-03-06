import Koa from "koa";
import dotenv from "dotenv"
import cors from "@koa/cors"
import bodyparser from "koa-bodyparser"


dotenv.config();
const app = new Koa();
const { router } = require("./routes/index.ts");

app.use(cors()).use(bodyparser()).use(router.routes());



export default app.listen(process.env.PORT,()=>{console.log(`running on port ${process.env.PORT}`)});


