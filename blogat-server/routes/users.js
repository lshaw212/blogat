const express = require("express");
const router = express.Router({mergeParams: true});
const { updateUser, getUser, favorite, getFavoriteBlogs } = require("../handlers/users");

router.route("/").put(updateUser);
router.route("/").put(favorite);
router.get(getFavoriteBlogs);

module.exports = router;