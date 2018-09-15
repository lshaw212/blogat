import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../components/Post";
import Modal from "../containers/Modal";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { fetchPosts } from "../store/actions/posts";
import { removePost } from "../store/actions/posts";
import { updatePost } from "../store/actions/posts";
import { withRouter } from "react-router-dom";


class Blog extends Component {

  componentDidMount(){
    // Fetch blogs
    // this.props.fetchBlogs();
    // this.props.fetchPosts();
    console.log("componentDidMount");
    
  }
  
  deleteBlog = e => {
    e.preventDefault();
    console.log("This is firing");
    // this.props
    //   .deleteBlog(this.props.location.state.id)
    //   .then(() => {
    //     this.props.history.push("/");
    //   })
    //   .catch(() => {
    //     return;
    //   });
  }

  editBlog = e => {
    e.preventDefault();
    
  }

  render(){
    const { blogs, posts, currentUser, removePost, updatePost, removeBlog } = this.props;
    let selectedB = blogs.find(blog => blog._id === this.props.match.params.id);
    const editBlogProps = {
      ariaLabel: 'A label describing the Modal\'s current content',
      blogName: selectedB.blogName,
      blogDescription: selectedB.blogDescription,
      blogImage: selectedB.blogImage,
      editBlog: true
    };
    const newPostProps = {
      ariaLabel: 'A label describing the Modal\'s current content',
      newPost: true
    }

    
    let postList = posts.filter(post => post.blog._id === this.props.match.params.id);
    let blogPosts = postList.map(p => (
      <Post
        key={p._id}
        title={p.postTitle}
        content={p.postContent}
        username={p.user.username}
        date={p.createdAt}
        postId={p._id}
        blogId={p.blog._id}
        removePost={removePost.bind(this, p.user._id, p.blog._id, p._id)}
        isCorrectUser={currentUser === p.user._id}
      />
    ));
    
    return(
      (typeof selectedB!='undefined')?
      <div className="container">
      <h1>Welcome to theeee {selectedB.blogName} blog!</h1>
      <p> {selectedB.blogDescription}</p>
      {currentUser === selectedB.user._id && (
        <div>
          <Modal triggerText='New Post' blogId={this.props.match.params.id} mProps={newPostProps} />
          <Modal triggerText='Edit Blog' blogId={this.props.match.params.id} mProps={editBlogProps} />
        </div>
      )}
      <div>
        {blogPosts}
      </div>     
    </div>
    : <div className="container">Loading...</div>
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
export default withRouter(connect(mapStateToProps, { fetchPosts, fetchBlogs, removePost, updatePost, deleteBlog })(Blog));