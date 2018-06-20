const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    postImageUrl: {
      type: String
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;