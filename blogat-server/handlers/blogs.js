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
    console.log(foundBlog);
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
// PUT - /api/users/:id/blogs/:blog_id
exports.updateBlog = async function(req,res,next){
  try {
    // Store updated data into an object
    let updateData = {
      blogName: req.body.blogName,
      blogDescription: req.body.blogDescription,
      blogImage: req.body.blogImage
    }
    console.log(updateData);
    // Update blog with new information after finding with the id provided
    let updatedBlog = await db.Blog.findByIdAndUpdate(req.params.blog_id,updateData, {new: true, runValidators: true})
      .populate("user", {
        username: true
      });
    await updatedBlog.save();
    console.log("updatedBlog");
    //console.log(updatedBlog);
    // return the new blog object
    return res.status(200).json(updatedBlog);
  } catch(err) {
    console.log(err.code);
    if(err.code === 500){
      err.message = "Sorry, please input the correct information.";
    }
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