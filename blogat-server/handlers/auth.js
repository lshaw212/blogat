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
    console.log("Test here");
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

