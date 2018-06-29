import React, { Component } from "react";
import { connect } from "react-redux";
import BlogItem from "../components/BlogItem";
import { fetchBlogs} from "../store/actions/blogs";

class BlogList extends Component {
  componentDidMount(){
    // Fetch blogs
    this.props.fetchBlogs();
  }

  render(){
    const { blogs, currentUser } = this.props;

    // map through your blog list
    let blogList = blogs.map(b => (
      <BlogItem
        key={b._id}
        date={b.createAt}
        text={b.blogName}
        desc={b.blogDescription}
        username={b.user.useraname}
        isCorrectUser={currentUser === b.user._id}
      />
    ));
    return(
      <div id="blogs">
          {blogList}
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

export default connect(mapStateToProps, {fetchBlogs})(BlogList);