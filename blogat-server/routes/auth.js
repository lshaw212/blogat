const express = require("express");
const router = express.Router();
const { signup, signin, favorite, getFavoriteBlogs, getUser, updateUser } = require("../handlers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/user/:user_id", getUser);
// router.put("/user/:user_id", updateUser);
// router.get("/:user_id", getFavoriteBlogs);
// router.put("/:user_id", favorite);

// router
//   .route("/:user_id")
//   .get(getFavoriteBlogs)
//   .put(favorite);

module.exports = router;