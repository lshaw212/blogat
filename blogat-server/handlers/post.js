const db = require("../models");

exports.createPost = async function(req,res,next){
  try {
    let post = await db.Post.create({
      postTitle: req.body.postTitle,
      postContent: req.body.postContent,
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

exports.updatePost = async function(req,res,next){
  try {
    // Store updated data into an object
    let updateData = {
      postTitle: req.body.postTitle,
      postContent: req.body.postContent
    }
    // Update blog with new information after finding with the id provided
    let updatedPost = await db.Post.findByIdAndUpdate(req.params.post_id,updateData, {new: true, runValidators: true})
    .populate("blog", {
      blogName: true
    })
    .populate("user", {
      username: true
    });
    await updatedPost.save();
    // return the new blog object
    return res.status(200).json(updatedPost);
  } catch(err) {
    return next(err);
  }
};

exports.deletePost = async function(req,res,next){
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    await foundPost.remove();
    return res.status(200).json(foundPost);
  } catch(err) {
    return next(err);
  }
}

exports.deleteBlogPosts = async function(req,res,next){
  try {
    // let foundBlogPosts = await db.Post.find({})
  } catch (err) {
    return next(err);
  }
}