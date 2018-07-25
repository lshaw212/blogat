const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./posts");

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
    // find a user
    await Post.remove({
      blog: {
        _id: this._id
      }
    });
    // let post = await Post.findAndModify({
    //   query: {
    //     blog: {
    //       _id: this._id
    //     }
    //   },
    //   remove: true
    // });

    // remove the id of the blog from their blog list
    console.log(this.posts);
    //console.log(post);
    //blogs.remove(this.id);
    //post.remove();
    // save that user
    //await post.save();
    // return next
    return next();
  } catch(err) {
    return next(err);
  }
});

// blogSchema.pre("remove", async function(next){
//   try {
//     // find a user
//     let user = await User.findById(this.user);
//     // remove the id of the blog from their blog list
//     user.blogs.remove(this.id);
//     // save that user
//     await user.save();
//     // return next
//     return next();
//   } catch(err) {
//     return next(err);
//   }
// });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;