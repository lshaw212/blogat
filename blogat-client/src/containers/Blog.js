import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../containers/Post";
import PostForm from "./PostForm";
import EditBlogForm from "./forms/EditBlogForm";
import Moment from "react-moment";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { favoriteBlog } from "../store/actions/auth";
import { fetchPosts, removePost, updatePost } from "../store/actions/posts";
import { withRouter } from "react-router-dom";
import { Modal, Dropdown, MenuItem, Button } from 'react-bootstrap';

class Blog extends Component {

  constructor(props){
    super(props);
    this.state={
      show: false,
      newPost: false,
      editBlog: false
    }
    this.handleNewPostShow = this.handleNewPostShow.bind(this);
    this.handleEditBlogShow = this.handleEditBlogShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  deleteBlog = e => {
    e.preventDefault();
    this.props
      .deleteBlog(this.props.location.state.id)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  userProfile(id){
    this.props.history.push({
      pathname:`/user/${id}`,
      state: {id: id}  
    });
  }

  favoriteBlog(id, e){
    this.props.favoriteBlog(id);
    e.stopPropagation();
  }

  handleClose(){this.setState({ show: false, newPost: false, editBlog: false, editPost: false });}
  handleNewPostShow(){this.setState({ show: true, newPost: true });}
  handleEditBlogShow(){this.setState({ show: true, editBlog: true});}
  handleEditPostShow(){this.setState({ show: true, editPost: true});}

  render(){
    const { blogs, posts, currentUser, removePost, favorites } = this.props;
    const fadedHeart = { opacity: "0.25",color:"black"}
    const fullHeart = { opacity: "0.85",color:"black"}

    let selectedB = blogs.find(blog => blog._id === this.props.match.params.id);
    let postList = posts.filter(post => post.blog._id === this.props.match.params.id);
    let blogPosts = postList.map(p => (
      <Post
        key={p._id}
        title={p.title}
        content={p.content}
        image={p.imageUrl}
        layout={p.layout}
        username={p.user.username}
        date={p.createdAt}
        updatedAt={p.updatedAt}
        postId={p._id}
        blogId={p.blog._id}
        removePost={removePost.bind(this, p.user._id, p.blog._id, p._id)}
        isCorrectUser={currentUser === p.user._id}
      />
    ));
    
    return(
      (typeof selectedB!=='undefined')?
      <div className="container" style={{marginTop: '30px'}}>
        <div id="blog-header-title">
          <div id="blog-blogname">{selectedB.blogName}</div>
          <div id="blog-favourite">
            <i
              className="fas fa-heart fa-3x"
              style={favorites.includes(selectedB._id) ? fullHeart : fadedHeart}
              onClick={this.favoriteBlog.bind(this, selectedB._id)}
            />
          </div>
        </div>
        <div id="blog-header">
          <div id="blog-image" style={{backgroundImage: `url(${selectedB.blogImage})`}}></div> 
        </div>
        <div id="blog-information">
            {/* Blog-profile */}
            <div className="blog-profile"> 
              <div id="blog-profile-image" onClick={this.userProfile.bind(this, selectedB.user._id)} style={{backgroundImage: `url(${selectedB.user.profileImageUrl})`}}></div>
              <div id="blog-blogowner">
                <div id="blog-username" onClick={this.userProfile.bind(this, selectedB.user._id)}>by {selectedB.user.username}</div>
              </div>
            </div>
            <div id="blog-description">
              <div id="blog-description-text">{selectedB.blogDescription}</div>
              <div id="blog-description-info">
                <div id="blog-created-date">
                  <div>Last Update: <Moment format="Do MMM YYYY">{selectedB.updatedAt}</Moment></div>
                </div> 
                <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
                  {this.state.newPost && 
                    <PostForm
                      blogId={this.props.match.params.id}
                      handleClose={this.handleClose}
                      {...this.props}
                    />
                  }
                  {this.state.editBlog &&
                    <EditBlogForm
                      blogId={this.props.match.params.id}
                      handleClose={this.handleClose}
                      blogName={selectedB.blogName}
                      blogDescription={selectedB.blogDescription}
                      blogImage={selectedB.blogImage}
                      {...this.props}
                    />
                  }
                </Modal>
              </div>
            </div>
            {currentUser === selectedB.user._id && (
              <div id="blog-edit">
                <Dropdown id="dropdown-custom-menu" pullRight>
                <i className="far fa-edit fa-2x edit-icon" bsRole="toggle"/>
                  <Dropdown.Menu className="dropdown-menu" bsRole="menu" style={{padding: ''}}>
                    <MenuItem onClick={this.handleEditBlogShow}>Edit Blog</MenuItem>
                    <MenuItem divider/>
                    <MenuItem onClick={this.deleteBlog}>Delete Blog</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}           
          </div>
      {currentUser === selectedB.user._id && (
        <div id="blog-owner-buttons">
          <Button className="btn-override" bsSize="large" onClick={this.handleNewPostShow}>New Post</Button>
        </div>
      )}
      <div className="post-list">
        {blogPosts}
      </div>
    </div>
    : <div className="container">
        <div className="lds-dual-ring"></div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    blogs: state.blogs,
    posts: state.posts,
    currentUser: state.currentUser.user.id,
    favorites: state.currentUser.user.favorites || []
  };
}
export default withRouter(connect(mapStateToProps, { fetchPosts, fetchBlogs, removePost, updatePost, deleteBlog, favoriteBlog })(Blog));