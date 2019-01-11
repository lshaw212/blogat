const express = require("express");
const router = express.Router({mergeParams: true});
const { updateUser, getUser, favorite, getFavoriteBlogs } = require("../handlers/users");

// user created in authRoute

router
  .route("/")
  .get(getUser)
  .put(updateUser);
  // No option to delete


// small route for favourting blog
// - Option to recieve fav blogs is outwith this route due to "ensureCorrectUser" middleware
// - No delete fav as put removes fav if already in list
router
  .route("/fav")
  .put(favorite);


router.route("/fav").get(getFavoriteBlogs);
module.exports = router;