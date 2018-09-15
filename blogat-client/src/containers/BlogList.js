import React, { Component } from "react";
import { connect } from "react-redux";
import BlogItem from "../components/BlogItem";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { fetchPosts } from "../store/actions/posts";
import { withRouter } from "react-router-dom";

class BlogList extends Component {
  componentDidMount(){
    // Fetch blogs
    //debugger;
    this.props.fetchBlogs();
    //debugger;
    this.props.fetchPosts();
    
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

  render(){
    const { blogs, currentUser } = this.props;
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
        selectBlog={this.selectBlog.bind(this, b._id)}
        removeBlog={this.removeBlog.bind(this, b._id)}
        isCorrectUser={currentUser === b.user._id}
      />
    ));
    return(
      <div>
          <div id="blogs">
            {blogList}
          </div>

      </div>
      
    )
  }
}

function mapStateToProps(state){
  return {
    blogs: state.blogs,
    currentUser: state.currentUser.user.id
  };
}


export default withRouter(connect(mapStateToProps, { fetchBlogs, deleteBlog, fetchPosts })(BlogList));