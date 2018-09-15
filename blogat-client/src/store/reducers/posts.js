import { LOAD_POSTS, REMOVE_POST, REMOVE_ALL_POSTS, CREATE_POST, UPDATE_POST } from "../actionTypes";

const posts = (state=[], action) => {

  switch(action.type){
    case LOAD_POSTS:
      return [...action.posts];
    case CREATE_POST:
      // Adding post to start of list
      return [action.post, ...state];
    case UPDATE_POST:
      return state.map(post=>
        (post._id === action.id)
          ? action.post
          : post
        )
    case REMOVE_POST:
      return state.filter(post => post._id !== action.id);
    case REMOVE_ALL_POSTS:
      return state;
    default:
      return state;
  }
}

export default posts;