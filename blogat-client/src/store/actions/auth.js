import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER, UPDATE_USER, FAVORITE_BLOG, GET_FAVORITE_BLOGS, SHOW_FAVORITE_BLOGS } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setAuthorizationToken(token){
  setTokenHeader(token);
}

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function updateCurrentUserImage(data){
  return {
    type: UPDATE_USER,
    data
  };
}

export const setFavoriteBlog = blog => ({
  type: FAVORITE_BLOG,
  blog
});

export const getFavoriteBlogs = blogs => ({
  type: GET_FAVORITE_BLOGS,
  blogs
});

export const showFavoriteBlogs = boolean => ({
  type: SHOW_FAVORITE_BLOGS,
  boolean
})

export function logout(){
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function authUser(type, userData){
  console.log(userData);
  return dispatch => {
    // wrap a thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({token, ...user}) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve(); // indication that the API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}
// Add res
export const favoriteBlog = (blogId) => (dispatch, getState) => {
  let { currentUser } = getState();
  const user_id = currentUser.user.id;
  return new Promise((resolve, reject) => {
    return apiCall("put", `/api/user/${user_id}/fav`, {blogId})
      .then(res => {
        resolve();
        dispatch(setFavoriteBlog(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
        console.log(err);
        reject();
      });
  });
};

// export const fetchFavorites = () => (dispatch, getState) => {
//   let { currentUser } = getState();
//   const userId = currentUser.user.id;
//   console.log("fetchFav");
//   return new Promise((resolve, reject) => {
//     return apiCall("get", `/api/user/${userId}/fav`)
//       .then(res => {
//         console.log(res);
//         resolve();
//         dispatch(getFavoriteBlogs(res));
//       })
//       .catch(err => {
//         dispatch(addError(err.message));
//         console.log(err);
//         reject();
//       });
//   });
// }