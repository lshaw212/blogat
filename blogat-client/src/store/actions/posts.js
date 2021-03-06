import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_POSTS, REMOVE_POST, CREATE_POST, REMOVE_ALL_POSTS, UPDATE_POST } from "../actionTypes";

export const loadPosts = posts => ({
  type: LOAD_POSTS,
  posts
});

export const remove = id => ({
  type: REMOVE_POST,
  id
});

export const removeAll = blog_id => ({
  type: REMOVE_ALL_POSTS,
  blog_id
});

export const create = post => ({
  type: CREATE_POST,
  post
});

export const update = (post, id) => ({
  type: UPDATE_POST,
  post,
  id
})

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
    return new Promise((resolve, reject) => {
      return apiCall("delete", `/api/users/${user_id}/blogs/${blog_id}/posts/${post_id}`)
        .then(() => {
          resolve();
          dispatch(remove(post_id));
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  }
}

export const createPost = (title, content, image, layout, blog_id) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return new Promise((resolve, reject) => {
    return apiCall("post", `/api/users/${id}/blogs/${blog_id}/posts`, {title, content, image, layout})
      .then(res => {
        resolve();
        dispatch(create(res));
      })
      .catch(err => {
        console.log(err);
        dispatch(addError(err.message));
        reject();
      }); 
  });
}

export const updatePost = (title, content, image, layout, blog_id, post_id) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/users/${id}/blogs/${blog_id}/posts/${post_id}`, {title, content, image, layout})
      .then(res => {
        resolve();
        dispatch(update(res, post_id));
      })
      .catch(err => {
        dispatch(addError(err.message));
        reject();
      });
  });
};