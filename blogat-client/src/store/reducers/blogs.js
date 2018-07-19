import { LOAD_BLOGS, REMOVE_BLOG } from "../actionTypes";

// const initialState = {
//   blogs: []
// }

const blogs = (state=[], action) => {
  //const newState = Object.assign({}, state);
  switch(action.type){
    case LOAD_BLOGS:
      return [...action.blogs];
    case REMOVE_BLOG:
      return state.filter(blog => blog._id !== action.id);
    default:
      return state;
  }
  
}

export default blogs;