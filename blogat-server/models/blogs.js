const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema(
  {
    blogName: {
      type: String,
      required: true,
      maxlength: 100
    },
    blogDescription: {
      type: String,
      required: true,
      maxlength: 200
    },
    blogImage: {
      type: String
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
);

blogSchema.pre("remove", async function(next){
  try {
    const User = require("./user");
    const Post = require("./posts");
    await Post.remove({
      blog: {
        _id: this._id
      }
    });
    let user = await User.findById(this.user);
    user.blogs.remove(this.id);
    user.posts.remove(...this.posts);
    await user.save();
    console.log(this.posts);
    return next();
  } catch(err) {
    return next(err);
  }
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;