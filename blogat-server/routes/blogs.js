const express = require("express");
const router = express.Router({mergeParams: true});

const { createBlog, getBlog, deleteBlog } = require("../handlers/blogs");

// prefix - /api/users/:id/blogs
router.route("/").post(createBlog);

// prefix - /api/users/:id/blogs/:blog_id
router
  .route("/:blog_id")
  .get(getBlog)
  .delete(deleteBlog);

module.exports = router;