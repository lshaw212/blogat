import { LOAD_BLOGS, REMOVE_BLOG, CREATE_BLOG, UPDATE_BLOG } from "../actionTypes";

const blogs = (state=[], action) => {
  switch(action.type){
    case LOAD_BLOGS:
      return [...action.blogs];
    case CREATE_BLOG:
      return [...state, action.blog]
    case UPDATE_BLOG:
    return state.map(blog =>
      (blog._id === action.id)
        ? action.blog
        : blog  
    )
    case REMOVE_BLOG:
      return state.filter(blog => blog._id !== action.id);
    default:
      return state;
  }
  
}

export default blogs;