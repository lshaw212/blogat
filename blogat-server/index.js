require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const db = require("./models");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const PORT = 7575;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", loginRequired, ensureCorrectUser, blogRoutes);

app.get("/api/blogs", async function(req,res,next){
  try {
    let blogs = await db.Blog.find()
      .sort({createdAt: "desc"})
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch(err) {
    return next(err);
  }
});


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