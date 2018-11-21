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
    // console.log(this.favBlogs.favorites);
    // console.log(favBlogs);
    // console.log(favBlogs[0].favorites);
    return res.status(200).json(favBlogs[0].favorites);
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