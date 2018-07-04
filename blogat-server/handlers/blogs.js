const db = require("../models");

exports.createBlog = async function(req,res,next){
  try {
    let blog = await db.Blog.create({
      blogName: req.body.blogName,
      blogDescription: req.body.blogDescription,
      blogImage: req.body.blogImage,
      user: req.params.user_id
    });
    let foundUser = await db.User.findById(req.params.user_id)
    foundUser.blogs.push(blog._id);
    await foundUser.save();
    let foundBlog = await db.Blog.findById(blog._id).populate("user", {
      username: true
    });
    return res.status(200).json(foundBlog);
  } catch(err) {
    return next(err);
  }
};

// GET - /api/users/:id/blogs/:blogs_id
exports.getBlog = async function(req,res,next){
  try {
    let blog = await db.Blog.find(req.params.blog_id);
    return res.status(200).json(blog);
  } catch(err) {
    return next(err);
  }
};

// DELETE - /api/users/:id/blogs/:blog_id
exports.deleteBlog = async function(req,res,next){
  try {
    let foundBlog = await db.Blog.findById(req.params.blog_id);
    await foundBlog.remove();
    return res.status(200).json(foundBlog);
  } catch(err) {
    return next(err);
  }
};