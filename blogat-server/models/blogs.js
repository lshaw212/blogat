const mongoose = require("mongoose");
const User = require("./user");

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
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the blog from their blog list
    user.blogs.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch(err) {
    return next(err);
  }
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;