const express = require("express");
const router = express.Router({mergeParams: true});

const { createPost, getPost, updatePost, deletePost } = require("../handlers/post");

router.route("/").post(createPost);

router
  .route("/:post_id")
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;