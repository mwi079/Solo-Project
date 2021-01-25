const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
mongoose.set("useFindAndModify", false);

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "My mongo ain't working...")
).once("open", () => console.log("Successfully connected to your Database 📟"));

module.exports = { mongoose };
