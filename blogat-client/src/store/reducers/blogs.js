import { LOAD_BLOGS } from "../actionTypes";

const blogs = (state = [], action) => {
  switch(action.type){
    case LOAD_BLOGS:
      return [...action.blogs];
    default:
      return state;
  }
}

export default blogs;