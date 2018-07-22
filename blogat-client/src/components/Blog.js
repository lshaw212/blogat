import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../components/Post";
import { fetchBlogs } from "../store/actions/blogs";
import { removePost } from "../store/actions/posts";
import { Link, withRouter, Redirect } from "react-router-dom";


class Blog extends Component {

render(){
  const { blogs, posts, currentUser, removePost } = this.props;
  let selectedB = blogs.find(blog => blog._id === this.props.location.state.id);
  let postList = posts.filter(post => post.blog._id === this.props.location.state.id);
  let blogPosts = postList.map(p => (
    <Post
      title={p.postTitle}
      content={p.postContent}
      username={p.user.username}
      date={p.createdAt}
      removePost={removePost.bind(this, p.user._id, p.blog._id, p._id)}
      isCorrectUser={currentUser === p.user._id}
    />
  ));
  return(
    <div className="container">
     <h1>Welcome to theeee {selectedB.blogName} blog!</h1>
     <p> {selectedB.blogDescription}</p>
     {currentUser === selectedB.user._id && (
       <button>Test button for removing Blog</button>
     )}
     <div>
       {blogPosts}
     </div>
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
    posts: state.posts,
    currentUser: state.currentUser.user.id
  };
}
export default withRouter(connect(mapStateToProps, { fetchBlogs, removePost })(Blog));