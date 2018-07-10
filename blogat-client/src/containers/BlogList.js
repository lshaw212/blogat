import React, { Component } from "react";
import { connect } from "react-redux";
import BlogItem from "../components/BlogItem";
import { fetchBlogs} from "../store/actions/blogs";
import { Link, withRouter, Redirect } from "react-router-dom";

class BlogList extends Component {
  componentDidMount(){
    // Fetch blogs
    this.props.fetchBlogs();
  }
  clickEvent = e => {
    e.preventDefault();
    console.log("Ayyy lmao");
    //this.props.history.push("/blog");
    //<Redirect push to="/blog/"/>
    this.props.history.push({
      pathname: '/blog',
      state: {
        id: 4
      }
    });
    console.log(this.props.location.state.id);
    //Click to go to the blog
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
        image={b.blogImage}
        username={b.user.useraname}
        clickEvent={this.clickEvent}
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

export default withRouter(connect(mapStateToProps, {fetchBlogs})(BlogList));