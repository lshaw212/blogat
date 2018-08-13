import { LOAD_POSTS, REMOVE_POST, REMOVE_ALL_POSTS, CREATE_POST } from "../actionTypes";

const initialState = {
  posts: []
}
const posts = (state=initialState, action) => {
  let posts;
  switch(action.type){
    case LOAD_POSTS:
      // return [...action.posts];
      return {...state, posts: action.posts};
    case REMOVE_POST:
      // return state.filter(post => post._id !== action.id);
      posts = state.posts.filter(val => val._id !== action.id);
      return {...state, posts};
    case REMOVE_ALL_POSTS:
      return state;
    case CREATE_POST:
      // Adding post to start of list
      return {...state, posts: [action.post, ...state.posts]};
    default:
      return state;
  }
}

export default posts;