const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    content: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    userId: {
      type: String
    },
    layout: {
      type: Number,
      required: true
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

postSchema.pre("remove", async function(next){
  try {
    const User = require("./user");
    const Blog = require("./blogs");
    let user = await User.findById(this.user);
    user.posts.remove(this.id);
    await user.save();
    let blog = await Blog.findById(this.blog);
    blog.posts.remove(this.id);
    await blog.save();
    return next();
  } catch(err) {
    return next(err);
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;