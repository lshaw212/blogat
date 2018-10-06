import { SET_CURRENT_USER, FAVORITE_BLOG, GET_FAVORITE_BLOGS } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
  favorites: []
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        // turn empty object into false or if there are keys, true
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    case FAVORITE_BLOG:
      return {...state, favorites:action.blog};
    case GET_FAVORITE_BLOGS:
      // debugger;
      return {...state, favorites:action.blogs};
    default:
      return state;
  }
};