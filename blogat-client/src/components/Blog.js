import React, { Component } from "react";
import { connect } from "react-redux";
import BlogItem from "../components/BlogItem";
import { fetchBlogs } from "../store/actions/blogs";
import { Link, withRouter, Redirect } from "react-router-dom";


class Blog extends Component {

render(){
  const { blogs, currentUser, blog } = this.props;
  let selectedB = blogs.find(blog => blog._id === this.props.location.state.id);
  return(
    <div className="container">
     <h1>Welcome to theeee {selectedB.blogName} blog!</h1>
     <p> {selectedB.blogDescription}</p>
   </div>
  )
}
}

// const Blog = ({text, blogs}) => (
//   <div className="container">
//     <h1>Welcome to the {text} blog!</h1>
//     <p> blah blah blah blah blah blah blah blah blah blah blah blah</p>
//   </div>
// )
function mapStateToProps(state){
  return {
    blogs: state.blogs,
    currentUser: state.currentUser.user.id
  };
}
export default withRouter(connect(mapStateToProps, {fetchBlogs })(Blog));