import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_BLOGS, REMOVE_BLOG, CREATE_BLOG, UPDATE_BLOG } from "../actionTypes";

export const loadBlogs = blogs => ({
  type: LOAD_BLOGS,
  blogs
});

export const removeBlog = id => ({
  type: REMOVE_BLOG,
  id
});

export const createBlog = blog => ({
  type: CREATE_BLOG,
  blog
});

export const update = (blog, id) => ({
  type: UPDATE_BLOG,
  blog,
  id
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

export const createNewBlog = (blogName,blogDescription,blogImage) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/blogs`, {blogName,blogDescription,blogImage})
    .then( res => {
      //add a dispatch?
      console.log("createNewBlog");
      dispatch(createBlog(res));
      
    })
    .catch(err => dispatch(addError(err.message)));
};

export const updateBlog = (blogName, blogDescription, blogImage, blogId) => (dispatch, getState) => {
  let {currentUser} = getState();
  const userId = currentUser.user.id;
  return apiCall("put", `/api/users/${userId}/blogs/${blogId}`, {blogName,blogDescription,blogImage})
    .then( res => {
      console.log("updatedBlog action");
      console.log(res);
      dispatch(update(res, blogId));
    })
    .catch(err =>{
      console.log("ERR");
      dispatch(addError(err.message));
    }); 
};

export const deleteBlog = (blogId) => (dispatch, getState) => {
  let {currentUser} = getState();
  const userId = currentUser.user.id;
  return apiCall("delete", `/api/users/${userId}/blogs/${blogId}`)
    .then(res => {
      console.log("success");
      dispatch(removeBlog(blogId));
    })
    .catch(err => {
      console.log("err");
      dispatch(addError(err.message));
    });
}