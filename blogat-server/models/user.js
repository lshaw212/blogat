const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  username: {
    type: String,
    required: [true, 'Your username cannot be blank.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Your password cannot be blank.']
  },
  profileImageUrl: {
    type: String
  },
  bio: {
    type: String
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  social: {
    twitter: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    github: {
      type: String,
      default: ''
    },
    emailToggle: {
      type: Boolean,
      default: false
    }  
  },
  favorites: [{
    type: String
  }]
});

// Validations
userSchema.path('email').validate(function(email){
  // Testing email to make sure it is a valid address
  return emailRegex.test(email);
}, 'Please enter a valid email.');

// userSchema.path('password').validate(function(password){

// }, 'Please enter a password');


userSchema.pre("save", async function(next){
  try{
    if(!this.isModified("password")){
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch(err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch(err) {
    return next(err);
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;