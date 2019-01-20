const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/blogat", {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Blog = require("./blogs");
module.exports.Post = require("./posts");

// mongodb://localhost/blogat