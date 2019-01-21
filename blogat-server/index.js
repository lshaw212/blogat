require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const db = require("./models");
const authRoutes = require("./routes/auth");
// const updateRoutes = require("./routes/update");
const userRoutes = require("./routes/users");
const blogRoutes = require("./routes/blogs");
const postRoutes = require("./routes/posts");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const PORT = process.env.PORT || 7575;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/api/auth", authRoutes);
app.use("/api/user/:user_id", loginRequired, ensureCorrectUser, userRoutes);
app.use("/api/users/:user_id/blogs",loginRequired, ensureCorrectUser, blogRoutes);
app.use("/api/users/:user_id/blogs/:blog_id/posts",loginRequired, ensureCorrectUser, postRoutes);

app.get("/api/users", async function(req,res,next){
  try {
    let users = await db.User.find()
      .sort({createdAt: "desc"})
      .populate("blogs", {
        blogName: true,
        blogImage: true,
        blogDescription: true
      })
      .populate("posts", {
        text: true
      });
    return res.status(200).json(users);
  } catch(err) {
    return next(err);
  }
})

app.get("/api/blogs", async function(req,res,next){
  try {
    let blogs = await db.Blog.find()
      .sort({createdAt: "desc"})
      .populate("user", {
        username: true,
        profileImageUrl: true
      })
      .populate("posts", {
        postTitle: true
      });
    return res.status(200).json(blogs);
  } catch(err) {
    return next(err);
  }
});

app.get("/api/posts", async function(req,res,next){
  try {
    let posts = await db.Post.find()
      .sort({createdAt: "desc"})
      .populate("blog",{
        blogName: true
      })
      .populate("user",{
        username: true
      });
    return res.status(200).json(posts);
  } catch(err) {
    return next(err);
  }
})

app.get("/api/favourites/:user_id", async function(req,res,next){
  try {
    let favBlogs = await db.User.find({_id: req.params.user_id});
    let favBlogs2 = await db.Blog.find({_id: favBlogs[0].favorites});
    // console.log(this.favBlogs.favorites);
    // console.log(favBlogs[0].favorites);
    // console.log(favBlogs2);
    // console.log(favBlogs[0].favorites);
    return res.status(200).json(favBlogs2);
  } catch(err) {
    return next(err);
  }
});
app.get("/api/users/:user_id", async function(req,res,next){
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
})



app.use(function(req,res,next){
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// Needs to go below
app.use(errorHandler);

app.listen(PORT, function(){
  console.log(`The server has started on port ${PORT}`);
});