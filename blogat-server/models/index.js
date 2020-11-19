const username = process.env.data_username;
const password = process.env.data_password
const CONNECTION_URL = `mongodb+srv://${username}:${password}@blogat.ugjbd.mongodb.net/blogat?retryWrites=true&w=majority`;


const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  autoIndex: false
}
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect(CONNECTION_URL, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting to the Database due to:", err);
  }
);

module.exports.User = require("./user");
module.exports.Blog = require("./blogs");
module.exports.Post = require("./posts");