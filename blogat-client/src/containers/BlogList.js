import React, { Component } from "react";
import { connect } from "react-redux";
import BlogItem from "../components/BlogItem";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { favoriteBlog, fetchFavorites } from "../store/actions/auth";
import { fetchPosts } from "../store/actions/posts";
import { withRouter } from "react-router-dom";

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
  favoriteBlog(id, e){
    console.log("Favorited!");
    this.props.favoriteBlog(id);
    e.stopPropagation();
  }

  render(){
    const { blogs, currentUser, favorites } = this.props;
    // map through your blog list
    //console.log(blogs);
    //debugger;
    //let bloggers = blogs;
    let blogList = blogs.map(b => (
      <BlogItem
        key={b._id}
        date={b.createAt}
        text={b.blogName}
        desc={b.blogDescription}
        image={b.blogImage}
        username={b.user.username}
        favToggle={this.favoriteBlog.bind(this, b._id)}
        selectBlog={this.selectBlog.bind(this, b._id)}
        removeBlog={this.removeBlog.bind(this, b._id)}
        favorite={favorites.includes(b._id) ? 'fas fa-star fa-2x' : 'far fa-star fa-2x'}
        isCorrectUser={currentUser === b.user._id}
      />
    ));
    return(
      (typeof blogs!='undefined')?
        <div> 
          <div id="blogs">
            {blogList}
          </div>
        </div>
        : <div>Loading....</div>
      
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