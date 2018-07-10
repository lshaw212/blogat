import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_BLOGS } from "../actionTypes";

export const loadBlogs = blogs => ({
  type: LOAD_BLOGS,
  blogs
});

export const fetchBlogs = () => {
  return dispatch => {
    return apiCall("get", "/api/blogs")
      .then(res => {
        dispatch(loadBlogs(res));
      })
      .catch(err => {
        dispatch(addError(err.messsage));
      });
  };
};

export const createNewBlog = () => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/blogs`, {})
    .then( res => {

    })
    .catch(err => dispatch(addError(err.message)));
};