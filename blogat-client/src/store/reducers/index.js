import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import blogs from "./blogs";
import posts from "./posts";

const rootReducer = combineReducers({
  currentUser,
  errors,
  blogs,
  posts
});

export default rootReducer;