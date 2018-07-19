import { LOAD_BLOGS, REMOVE_BLOG, CREATE_BLOG } from "../actionTypes";

// const initialState = {
//   blogs: []
// }

const blogs = (state=[], action) => {
  //const newState = Object.assign({}, state);
  switch(action.type){
    case LOAD_BLOGS:
      debugger;
      console.log("load");
      return [...action.blogs];
    case CREATE_BLOG:
      console.log("Create");
      console.log(action.blog);
      return {...state, blogs: [...state.blogs, action.blog]};
      //return state;
    case REMOVE_BLOG:
      return state.filter(blog => blog._id !== action.id);
    default:
      return state;
  }
  
}

export default blogs;