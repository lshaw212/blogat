import { SET_CURRENT_USER, UPDATE_USER, FAVORITE_BLOG, GET_FAVORITE_BLOGS, SHOW_FAVORITE_BLOGS } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
  showFavorites: false
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case SET_CURRENT_USER:
      return {
        // turn empty object into false or if there are keys, true
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user,
        showFavorites: false
      };
    case UPDATE_USER:
      return {...state, user:{...state.user, profileImageUrl: action.data}}
    case FAVORITE_BLOG:
      // debugger;
      return {...state, user:{...state.user, favorites:action.blog}};
    case SHOW_FAVORITE_BLOGS:
      return {...state, showFavorites:!action.boolean}
    default:
      return state;
  }
};