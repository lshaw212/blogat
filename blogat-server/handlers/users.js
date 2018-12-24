const db = require("../models");
const jwt = require("jsonwebtoken");

exports.updateUser = async function(req, res, next){
  try {
    let updatedData = {
      bio: req.body.bio,
      profileImageUrl: req.body.profileImageUrl,
      'social.twitter': req.body.twitter,
      'social.linkedin': req.body.linkedin,
      'social.github': req.body.github,
      'social.emailToggle': req.body.emailToggle
    }
    let updatedUser = await db.User.findByIdAndUpdate(req.params.user_id, updatedData, {new: true, runValidators: true});
    await updatedUser.save();
    return res.status(200).json(updatedUser);
  } catch(err) {
    if(err.code === 500){
      err.message = "Sorry, please input the correct information.";
    }
  }
}

exports.getFavoriteBlogs = async function(req,res,next){
  try {
    let favBlogs = await db.User.find({_id: req.params.user_id});
    let favBlogs2 = await db.Blog.find({_id: favBlogs[0].favorites});
    // console.log(this.favBlogs.favorites);
    // console.log(favBlogs[0].favorites);
    console.log(favBlogs2);
    // console.log(favBlogs[0].favorites);
    return res.status(200).json(favBlogs2);
  } catch(err) {
    return next(err);
  }
};

exports.favorite = async function(req, res, next){
  try {
    let blogId = req.body.blogId;
    let userId = req.params.user_id;
    let user = await db.User.findOne({_id: userId});
    if(!user.favorites.includes(blogId)){
      await db.User.update({_id: userId},
          {
            $push: {
              'favorites': blogId
            }
          }
        );
      await db.Blog.update({_id: blogId},
        {
          $push: {
            'favorites': userId
          }
        }
      );
      console.log("Favorite blog has been added");
    } else {
      await db.User.update({_id: userId},
        {
          $pull: {
            'favorites': blogId
          }
        }
      );
      await db.Blog.update({_id: blogId},
        {
          $pull: {
            'favorites': userId
          }
        }
      );
      console.log("Favorite blog has been removed");
    }
    let updatedUser = await db.User.find({_id: req.params.user_id});
    console.log(updatedUser[0].favorites);
    return res.status(200).json(updatedUser[0].favorites);
    // return res.status(200);
  } catch(err) {
    console.log(err.code);
    return next({
      status: 400,
      message: err.message
    });
  }
}

exports.getUser = async function(req, res, next){
  try {
    let user = await db.User.find({_id: req.params.user_id}, 'username profileImageUrl blogs favorites social bio email')
      .populate("blogs", {
        blogName: true,
        blogImage: true,
        blogDescription: true
      })
      .populate("favorites", {
        // doesn't work yet
        blogName: true
      });
    return res.status(200).json(user[0]);
  } catch {
    return next(err);
  }
}