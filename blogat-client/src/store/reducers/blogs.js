import { LOAD_BLOGS, REMOVE_BLOG, CREATE_BLOG, UPDATE_BLOG } from "../actionTypes";

const initialState = {
  blogs: []
}

const blogs = (state=[], action) => {
  //const newState = Object.assign({}, state);
  let blogs;
  switch(action.type){
    case LOAD_BLOGS:
      //debugger;
      console.log("load");
      return [...action.blogs];
      //return {...state, blogs: action.blog}
    case CREATE_BLOG:
      //debugger;
      // blogs = [...state, action.blog];
      //return [...state, action.blog];
      return {...state, blogs:[...state.blogs, action.blog]};
    case UPDATE_BLOG:
     debugger;
    console.log("we get here");
    console.log(action.blog);
    return state.map(blog =>
      (blog._id === action.id)
        ? action.blog
        : blog  
    )

    case REMOVE_BLOG:
      //return state.filter(blog => blog._id !== action.id);
      blogs = state.blogs.filter(blog => blog._id !== action.id);
      return {...state, blogs}
    default:
      return state;
  }
  
}

export default blogs;