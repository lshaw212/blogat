import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_POSTS, REMOVE_POST, CREATE_POST } from "../actionTypes";
import { loadBlogs } from "./blogs";

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const removePost = id => ({
  type: REMOVE_POST,
  id
});

export const createPost = post => ({
  type: CREATE_POST,
  post
});

export const fetchPosts = () => {
  return dispatch => {
    return apiCall("get", "/api/posts")
      .then(res => {
        dispatch(loadPosts(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};