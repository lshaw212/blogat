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

exports.updateBlog = async function(req,res,next){
  // try {
  //   let blog = {
  //     blogName: req.body.blogName,
  //     blogDescription: req.body.blogDescription,
  //     blogImage: req.body.blogImage,
  //     user: req.params.user_id
  //   }
  //   console.log(blog);
  //   await db.Blog.update({_id: req.params.blog_id}, blog);
  //   // return res.status(200);
  //   return next();
  // } catch(err) {
  //   console.log("Do we get an error?");
  //   return next(err);
  // }
  try {
    let updatedBlog = await db.Blog.findById(req.params.blog_id, function(err, blog){
      blog.blogName = req.body.blogName;
      blog.blogDescription = req.body.blogDescription;
      blog.blogImage = req.body.blogImage;

      blog.save();
    }).populate("user", {
      username: true
    });
    await updatedBlog.save();
    return res.status(200).json(updatedBlog);
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