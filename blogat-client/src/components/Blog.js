import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "../components/Post";
// import Modal from "../containers/Modal";
import PostForm from "../containers/PostForm";
import EditBlogForm from "../containers/EditBlogForm";
import Moment from "react-moment";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { favoriteBlog, fetchFavorites } from "../store/actions/auth";
import { fetchPosts, removePost, updatePost } from "../store/actions/posts";
import { withRouter } from "react-router-dom";
import { Modal, Dropdown, MenuItem } from 'react-bootstrap';

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

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    // Fetch blogs
    // this.props.fetchBlogs();
    // this.props.fetchPosts();
    console.log("componentDidMount");
    
  }

  handleClick(e){
    e.preventDefault();
    this.props.onClick(e);
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
  handleClose() {
    this.setState({ show: false, newPost: false, editBlog: false, editPost: false });
  }

  handleNewPostShow() {
    this.setState({ show: true, newPost: true });
  }
  handleEditBlogShow(){
    this.setState({ show: true, editBlog: true});
  }
  handleEditPostShow(){
    this.setState({ show: true, editPost: true})
  }
  handleClick(e){
    e.preventDefault();

    // Find out if this is needed?
    // this.props.onClick(e);
  }

  render(){
    const { blogs, posts, currentUser, removePost, favorites, updatePost, removeBlog } = this.props;
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
      (typeof selectedB!='undefined')?
      <div className="container">
      <div className="blog-header-title">
        <div id="blog-blogname">{selectedB.blogName}</div>
        <div id="blog-favourite">
          <i
            className={favorites.includes(selectedB._id) ? 'fas fa-star fa-2x' : 'far fa-star fa-2x'}
            onClick={this.favoriteBlog.bind(this, selectedB._id)}
          />
        </div>
      </div>
      <div className="blog-header">
        <div className="blog-image" style={{backgroundImage: `url(${selectedB.blogImage})`}}>
        </div>
        <div className="blog-information">
          <div className="blog-profile">
            <div className="blog-profile-image" style={{backgroundImage: `url(${selectedB.user.profileImageUrl})`}}></div>
            <div className="blog-blogowner">
              <div>by</div>
              <div className="blog-username" onClick={this.userProfile.bind(this, selectedB.user._id)}>{selectedB.user.username}</div>
            </div>
          </div>
          <div className="blog-description">
            <p>{selectedB.blogDescription}</p>
            <div className="blog-description-info">
              <div className="blog-created-date">
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
          <div>
            <Dropdown id="dropdown-custom-menu">
            <i className="far fa-edit fa-2x edit-icon" onClick={this.handleClick} bsRole="toggle"/>
              <Dropdown.Menu className="dropdown-menu" bsRole="menu" style={{padding: ''}}>
                <MenuItem>Click if you wanna die</MenuItem>
                <MenuItem onClick={this.handleEditBlogShow}>Edit Blog</MenuItem>
                <MenuItem divider/>
                <MenuItem onClick={this.deleteBlog}>Delete Blog</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          
          
        </div>
      </div>
      {currentUser === selectedB.user._id && (
        <div className="blog-owner-buttons">
          <button id="new-post-btn" onClick={this.handleNewPostShow}>Submit a new blog post</button>
        </div>
      )}
      <div className="post-list">
        {blogPosts}
      </div>     
    </div>
    : <div className="container">
        <div class="lds-dual-ring"></div>
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
    currentUser: state.currentUser.user.id,
    favorites: state.currentUser.favorites || []
  };
}
export default withRouter(connect(mapStateToProps, { fetchPosts, fetchBlogs, removePost, updatePost, deleteBlog, favoriteBlog, fetchFavorites })(Blog));

// {/* <div className="blog-left">
//           <div className="blog-header-desc">
//             <p>{selectedB.blogDescription}</p>
//           </div>
//           <div className="blog-header-details">
//             <div className="blog-header-details-left">
//               <div className="blog-header-profile-image"></div>
//               <div className="blog-header-blogowner">
//                 <div>by</div>
//                 <div className="blog-header-username" onClick={this.userProfile.bind(this, selectedB._id)}>{selectedB.user.username}</div>
//               </div>
              
//             </div>
//             <div className="blog-header-details-right">
//               <div className="blog-header-icons">
//                 <i className="fas fa-newspaper fa-2x"/>
//                 <i
//                   className={favorites.includes(selectedB._id) ? 'fas fa-star fa-2x' : 'far fa-star fa-2x'}
//                   onClick={this.favoriteBlog.bind(this, selectedB._id)}
//                 />
//               </div>
//               <div className="blog-header-icon-text">
//                 <div>{posts.length}</div>
//                 <div>{favorites.length}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="blog-right">
//           <div className="blog-right-image" style={{backgroundImage: `url(${selectedB.blogImage})`}}>
//           {/* <p>test image</p> */}
//           </div>
//         </div> */}






// <div>
//             <div className="dropdown">
//               <i class="far fa-edit fa-2x edit-icon dropdown-toggle"></i>
//               <div id="dropdown-menu" className="edit-dropdown">
//                 <div className="dropdown-item">Test</div>
//                 <Modal triggerText='New Post' blogId={this.props.match.params.id} mProps={newPostProps} btnClass="" btnText='New Post' />
//                 <Modal triggerText='Edit Blog' blogId={this.props.match.params.id} mProps={editBlogProps} btnClass="c-btn" btnText='Edit Blog' />
//               </div>
//             </div>
//           </div>


{/* <div className="blog-post-favourite-count">
            <div>
              <div className="count-header">Posts</div>
              <div className="count">{postList.length}</div>
            </div>
            <div>
              <div className="count-header">Favourites</div>
              <div className="count">{favorites.length}</div>
            </div>
          </div> */}
          
          {/* <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </div> */}