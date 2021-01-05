const mongoose = rerquire('mongoose');
const dotenv = require('dotenv')

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db
  .on('error', console.error.bind(console, "My mongo ain't working..."))
  .once('open', () => console.log('Successfully connected to your Database 📟'));


  module.exports = {mongoose}