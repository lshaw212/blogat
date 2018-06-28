import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import blogs from "./blogs";

const rootReducer = combineReducers({
  currentUser,
  errors,
  blogs
});

export default rootReducer;