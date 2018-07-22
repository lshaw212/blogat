import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_POSTS, REMOVE_POST, CREATE_POST } from "../actionTypes";
import { loadBlogs } from "./blogs";

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const remove = id => ({
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

export const removePost = (user_id, blog_id, post_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/blogs/${blog_id}/posts/${post_id}`)
      .then(() => {
        dispatch(remove(post_id));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  }
}