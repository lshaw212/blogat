import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../components/Post";
import Modal from "../containers/Modal";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { favoriteBlog, fetchFavorites } from "../store/actions/auth";
import { fetchPosts, removePost, updatePost } from "../store/actions/posts";
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

  userProfile(id,e){
    this.props.history.push({
      pathname:`/user/${id}`,
      state: {id: id}  
    });
  }

  favoriteBlog(id, e){
    console.log("Favorited!");
    this.props.favoriteBlog(id);
    e.stopPropagation();
  }

  editBlog = e => {
    e.preventDefault();
    
  }

  render(){
    const { blogs, posts, currentUser, removePost, favorites, updatePost, removeBlog } = this.props;
    let selectedB = blogs.find(blog => blog._id === this.props.match.params.id);
    console.log(posts.length);
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
      <div className="blog-header">
        <div className="blog-header-title">
          <p>{selectedB.blogName}</p>
        </div>
        <div className="blog-left">
          <div className="blog-header-desc">
            <p>{selectedB.blogDescription}</p>
          </div>
          <div className="blog-header-details">
            <div className="blog-header-details-left">
              <div className="blog-header-profile-image"></div>
              <div className="blog-header-blogowner">
                <div>by</div>
                <div className="blog-header-username" onClick={this.userProfile.bind(this, selectedB._id)}>{selectedB.user.username}</div>
              </div>
              
            </div>
            <div className="blog-header-details-right">
              <div className="blog-header-icons">
                <i className="fas fa-newspaper fa-2x"/>
                <i
                  className={favorites.includes(selectedB._id) ? 'fas fa-star fa-2x' : 'far fa-star fa-2x'}
                  onClick={this.favoriteBlog.bind(this, selectedB._id)}
                />
              </div>
              <div className="blog-header-icon-text">
                <div>{posts.length}</div>
                <div>{favorites.length}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-right">
          <div className="blog-right-image" style={{backgroundImage: `url(${selectedB.blogImage})`}}>
          {/* <p>test image</p> */}
          </div>
        </div>
      </div>
      
      {currentUser === selectedB.user._id && (
        <div>
          <Modal triggerText='New Post' blogId={this.props.match.params.id} mProps={newPostProps} btnClass="c-btn" btnText='New Post' />
          <Modal triggerText='Edit Blog' blogId={this.props.match.params.id} mProps={editBlogProps} btnClass="c-btn" btnText='Edit Blog' />
        </div>
      )}
      <div className="post-list">
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
    currentUser: state.currentUser.user.id,
    favorites: state.currentUser.favorites || []
  };
}
export default withRouter(connect(mapStateToProps, { fetchPosts, fetchBlogs, removePost, updatePost, deleteBlog, favoriteBlog, fetchFavorites })(Blog));