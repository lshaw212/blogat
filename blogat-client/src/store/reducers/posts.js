import { LOAD_POSTS, REMOVE_POST, CREATE_POST } from "../actionTypes";

const posts = (state=[], action) => {

  switch(action.type){
    case LOAD_POSTS:
      debugger;
      return [...action.posts];
    case REMOVE_POST:
      return state.filter(post => post._id !== action.id);
    case CREATE_POST:
      return state;
    default:
      return state;
  }
}

export default posts;