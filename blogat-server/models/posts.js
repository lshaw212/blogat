const mongoose = require("mongoose");
const User = require("./user");

const postSchema = new mongoose.Schema(
  {
    postTitle: {
      type: String,
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
    postImageUrl: {
      type: String
    },
    userId: {
      type: String
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;