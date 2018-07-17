import { LOAD_BLOGS, GET_BLOG } from "../actionTypes";

const initialState = {
  blogs: []
}

const blogs = (state=initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type){
    case LOAD_BLOGS:
      newState.blogs = action.blogs;
      return newState;
    case GET_BLOG:
      newState.selectedBlog = state.blogs.find(blog => blog._id === action.id);
      return newState;
    default:
      return state;
  }
  
}

export default blogs;