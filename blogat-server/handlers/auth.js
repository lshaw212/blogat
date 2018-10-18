const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req,res,next){
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch){
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password."
      });
    }
  } catch(err) {
    return next({
      status: 400,
      message: "Invalid Email/Password."
    });
  }
  // Checks if the password sent to the server matches
  // if true, log the user in
}

exports.signup = async function(req, res, next){
  try {
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch(err) {
    if(err.code === 11000){
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.getUser = async function(req, res, next){
  try {
    console.log("Beep");
    let userId = req.params.id;
    console.log(req.params.user_id);
    let user = await db.User.find({_id: req.params.user_id}, 'username profileImageUrl blogs favorites');
    console.log(user);
    return res.status(200).json(user[0]);
  } catch {
    console.log("Oops");
    return next(err);
  }
}

exports.getFavoriteBlogs = async function(req,res,next){
  try {
    let favBlogs = await db.User.find({_id: req.params.user_id});
    // console.log(this.favBlogs.favorites);
    // console.log(favBlogs);
    console.log(favBlogs[0].favorites);
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