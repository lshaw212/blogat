import React, { Component } from "react";
import { connect } from "react-redux";
import BlogItem from "../components/BlogItem";
import Loading from "../components/Loading";
import NoResult from "../components/NoResult";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { favoriteBlog, fetchFavorites } from "../store/actions/auth";
import { fetchPosts } from "../store/actions/posts";
import { withRouter } from "react-router-dom";
import { Flipper, Flipped } from 'react-flip-toolkit';
import shuffle from "lodash.shuffle";
import qs from "qs";

const defaultState = {
  filter: ""
}

class BlogList extends Component {

  constructor(props){
    super(props);
    this.state={
      blogList: [],
      favourites: []
    }
  }
  componentDidMount(){
    // Fetch blogs
    //debugger;
    this.loadBlogs();
    //debugger;
    this.props.fetchPosts();
    
    
  }

  updateQueryParam = obj => {
    this.props.history.push({
      search: `?${qs.stringify({
        ...qs.parse(this.props.location.search.replace("?", "")),
        ...obj
      })}`
    })
  }

  async loadBlogs(){
    // this.setState({blogList: this.props.blogs});
    await this.props.fetchBlogs();
    await this.props.fetchFavorites();
    this.setState({blogList: this.props.blogs});
    this.setState({favourites: this.props.favorites});
  }

  // Potential to refactor this to work as an action
  selectBlog(id, e){
    e.preventDefault();
    // this.setState({blogList: this.props.blogs})
    this.props.history.push({
      pathname:`/blogs/${id}`,
      state: {id: id}  
    });
  }
  async favoriteBlog(id, e){
    e.stopPropagation();
    console.log("boo");
    await this.props.favoriteBlog(id);
    await this.props.fetchBlogs();
  }
  
  render(){
    const { blogs, currentUser, favorites } = this.props;
    const queryParamState = {
      ...defaultState,
      ...qs.parse(this.props.location.search.replace("?", ""))
    }
    // const favList = (this.state.blogList);
    const favList = (this.state.blogList).filter(({_id}) => favorites.includes(_id));
    console.log(this.state.blogList[0]);
    console.log(this.props.favorites);
    const blogList = (favList)
      .filter(({blogName}) => blogName.includes(queryParamState.filter));

    return(
      (typeof blogs!=='undefined')?
        <div>
          <Flipper flipKey={blogList}>
            {blogList.length === 0 ? (
              <NoResult/>
            ) : (
              <div id="blogs">
                {blogList.map(b => (
                  <Flipped key={b._id} flipId={b._id}>
                  {flippedProps =>
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
                      favorite={favorites.includes(b._id) ? 'fas fa-star fa-3x' : 'far fa-star fa-3x'}
                      isCorrectUser={currentUser === b.user._id}
                      flippedProps={flippedProps}
                      navigate={this.navigate}
                    />
                  }
                    </Flipped>
                ))}
              </div>
            )}
          </Flipper>
        </div>
        : <Loading/>
      
    )
  }
}

function mapStateToProps(state){
  return {
    blogs: state.blogs|| [],
    currentUser: state.currentUser.user.id,
    favorites: state.currentUser.favorites || []
  };
}


export default withRouter(connect(mapStateToProps, { fetchBlogs, deleteBlog, fetchPosts, favoriteBlog, fetchFavorites })(BlogList));