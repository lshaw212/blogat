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

exports.favoritesss = async function(req, res, next){
  try {
    let blogId = req.body.blogId;
    let user = await db.User.findOne({_id: req.params.user_id});
    if(!user.favorites.includes(blogId)){
      await db.User.update({_id: req.params.user_id},
          {
            $push: {
              'favorites': blogId
            }
          }
        );
      console.log("Favorite blog has been added");
    } else {
      await db.User.update({_id: req.params.user_id},
        {
          $pull: {
            'favorites': blogId
          }
        }
      );
      console.log("Favorite blog has been removed");
    }
    return res.status(200).json(user);
    // return res.status(200);
  } catch(err) {
    console.log(err.code);
    return next({
      status: 400,
      message: err.message
    });
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
    let user = await db.User.findOne({_id: req.params.user_id});
    if(!user.favorites.includes(blogId)){
      await db.User.update({_id: req.params.user_id},
          {
            $push: {
              'favorites': blogId
            }
          }
        );
      console.log("Favorite blog has been added");
    } else {
      await db.User.update({_id: req.params.user_id},
        {
          $pull: {
            'favorites': blogId
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