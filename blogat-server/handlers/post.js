const db = require("../models");

exports.createPost = async function(req,res,next){
  try {
    let post = await db.Post.create({
      text: req.body.text,
      blog: req.params.blog_id,
      user: req.params.user_id
    });
    let foundBlog = await db.Blog.findById(req.params.blog_id);
    foundBlog.posts.push(post._id);
    await foundBlog.save();
    let foundUser = await db.User.findById(req.params.user_id);
    foundUser.posts.push(post._id);
    await foundUser.save();
    let foundPost = await db.Post.findById(post._id).populate("blog", {
      blogName: true
    })
    .populate("user", {
      username: true
    });
    return res.status(200).json(foundPost);
  } catch(err) {
    return next(err);
  }
}

exports.getPost = async function(req,res,next){
  try {
    let post = await db.Post.find(req.params.post_id);
    return res.status(200).json(post);
  } catch(err) {
    return next(err);
  }
}

exports.deletePost = async function(req,res,next){
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    await foundPost.remove();
    return res.status(200).json(foundPost);
  } catch(err) {
    return next(err);
  }
}