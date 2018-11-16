import React, { Component } from "react";
import { connect } from "react-redux";
import BlogItem from "../components/BlogItem";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { favoriteBlog, fetchFavorites } from "../store/actions/auth";
import { fetchPosts } from "../store/actions/posts";
import { withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class BlogList extends Component {
  componentDidMount(){
    // Fetch blogs
    //debugger;
    this.props.fetchBlogs();
    //debugger;
    this.props.fetchPosts();
    this.props.fetchFavorites();
    
  }


  // Potential to refactor this to work as an action
  selectBlog(id, e){
    // e.preventDefault();
    this.props.history.push({
      pathname:`/blogs/${id}`,
      state: {id: id}  
    });
  }

  removeBlog(id, e){
    // e.preventDefault();
    console.log("HDHD");
    this.props.deleteBlog(id);
    e.stopPropagation();
  }
  async favoriteBlog(id, e){
    console.log("Favorited!");
    e.stopPropagation();
    await this.props.favoriteBlog(id);
    await this.props.fetchBlogs();
  }

  render(){
    const { blogs, currentUser, favorites } = this.props;
    // map through your blog list
    //console.log(blogs);
    //debugger;
    //let bloggers = blogs;
    let blogList = blogs;
    return(
      (typeof blogs!='undefined')?
        <div> 
          <div id="blogs">
          {/* <TransitionGroup> */}
              {blogList.map(b => (
                <CSSTransition
                  key={b._id}
                  timeout={5000}
                  classNames="fade"
                >
                  <BlogItem
                    key={b._id}
                    date={b.createAt}
                    text={b.blogName}
                    desc={b.blogDescription}
                    image={b.blogImage}
                    username={b.user.username}
                    postCount={b.posts.length}
                    favCount={b.favorites.length}
                    profileImage={b.user.profileImageUrl}
                    favToggle={this.favoriteBlog.bind(this, b._id)}
                    selectBlog={this.selectBlog.bind(this, b._id)}
                    removeBlog={this.removeBlog.bind(this, b._id)}
                    favorite={favorites.includes(b._id) ? 'fas fa-star fa-3x' : 'far fa-star fa-3x'}
                    isCorrectUser={currentUser === b.user._id}
                  />
                 </CSSTransition>
              ))}
            
          {/* </TransitionGroup> */}
          </div>
        </div>
        : <div className="container">
            <div class="lds-dual-ring"></div>
          </div>
      
    )
  }
}

function mapStateToProps(state){
  return {
    blogs: state.blogs,
    currentUser: state.currentUser.user.id,
    favorites: state.currentUser.favorites || []
  };
}


export default withRouter(connect(mapStateToProps, { fetchBlogs, deleteBlog, fetchPosts, favoriteBlog, fetchFavorites })(BlogList));