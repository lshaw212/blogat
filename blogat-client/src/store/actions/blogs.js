import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_BLOGS, GET_BLOG } from "../actionTypes";

export const loadBlogs = blogs => ({
  type: LOAD_BLOGS,
  blogs
});

export const getBlog = id => ({
  type: GET_BLOG,
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

// export const retrieveBlog = (blog_id) => {
//   return dispatch => {
//     return apiCall("get", "/api/blogs")
//       .then(res => {
//         console.log("RetrieveBlog1...");
//         dispatch(getBlog(blog_id));
//         console.log("RetrieveBlog2...");
//       })
//       .catch(err => {
//         dispatch(addError(err.message));
//       });
//   }
// }

export const createNewBlog = (blogName,blogDescription,blogImage) => (dispatch, getState) => {
  let {currentUser} = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/blogs`, {blogName,blogDescription,blogImage})
    .then( res => {

    })
    .catch(err => dispatch(addError(err.message)));
};