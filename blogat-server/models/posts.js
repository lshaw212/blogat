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

postSchema.pre("remove", async function(next){
  try {
    let user = await User.findById(this.user);
    user.posts.remove(this.id);
    await user.save();
    console.log("Test");
    return next();
  } catch(err) {
    return next(err);
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;