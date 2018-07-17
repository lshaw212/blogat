import { SET_CURRENT_BLOG } from "../actionTypes";

const DEFAULT_STATE = {
  blog: {}
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case SET_CURRENT_BLOG:
      return {
        // turn empty object into false or if there are keys, true
        blog: action.blog
      };
    default:
      return state;
  }
};