import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../components/Post";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { removePost } from "../store/actions/posts";
import { Link, withRouter, Redirect } from "react-router-dom";


class Blog extends Component {

  deleteBlog = e => {
    e.preventDefault();
    console.log("SDKJGHSAD");
    this.props.deleteBlog(this.props.location.state.id);
  }

  editBlog = e => {
    e.preventDefault();
  }

  render(){
    const { blogs, posts, currentUser, removePost, removeBlog } = this.props;
    console.log("Blog Render method");
    //console.log(this.props.match.params.id);
    //console.log(this.props.location.state.id);
    // debugger;
    let selectedB = blogs.find(blog => blog._id === this.props.match.params.id);
    let postList = posts.filter(post => post.blog._id === this.props.match.params.id);
    let blogPosts = postList.map(p => (
      <Post
        key={p._id}
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
      <Link to={`/blog/${this.props.match.params.id}/newpost`}>New Post</Link>
      {currentUser === selectedB.user._id && (
        <div>
          <button onClick={this.deleteBlog}>Test button for removing Blog</button>
          <Link to={`/blog/${this.props.match.params.id}/edit`}>Edit Blog</Link>
        </div>
        
          // <div></div>
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
export default withRouter(connect(mapStateToProps, { fetchBlogs, removePost,deleteBlog })(Blog));