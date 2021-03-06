import React, { Component } from "react";
import { connect } from "react-redux";
import BlogItem from "../components/BlogItem";
import Loading from "../components/Loading";
import NoResult from "../components/NoResult";
import { fetchBlogs, deleteBlog } from "../store/actions/blogs";
import { favoriteBlog } from "../store/actions/auth";
import { fetchPosts } from "../store/actions/posts";
import { withRouter } from "react-router-dom";
import { Flipper, Flipped } from 'react-flip-toolkit';
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
    this.props.fetchPosts();
    this.props.fetchBlogs();
    // let favourites
    // this.props.fetchFavorites();  
  }

  updateQueryParam = obj => {
    this.props.history.push({
      search: `?${qs.stringify({
        ...qs.parse(this.props.location.search.replace("?", "")),
        ...obj
      })}`
    })
  }

  // Potential to refactor this to work as an action
  selectBlog(id, e){
    e.preventDefault();
    // this.setState({blogList: this.props.blogs})
    this.props.history.push({
      pathname:`/blog/${id}`,
      state: {id: id}  
    });
  }
  async favoriteBlog(id, e){
    e.stopPropagation();
    await this.props.favoriteBlog(id);
    await this.props.fetchBlogs();
  }
  
  render(){
    const { blogs, currentUser, favorites, showFavourites } = this.props;
    // const { fadedHeart, pinkHeart } = styles;
    const fadedHeart = { opacity: "0.25",color:"black"}
    const fullHeart = { opacity: "0.85",color:"black"}
    const queryParamState = {
      ...defaultState,
      ...qs.parse(this.props.location.search.replace("?", ""))
    }
    let favList
    if(showFavourites){
      favList = (blogs).filter(({_id}) => favorites.includes(_id));
    } else {
      favList = (blogs)
    }

    // const blogList = (favList)
    //   .filter(({blogName}) => blogName.includes(queryParamState.filter));

    const blogList = (favList)
      .filter(({blogName}) => blogName.toLowerCase().includes(queryParamState.filter));
      
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
                      favorite={favorites.includes(b._id) ? fullHeart : fadedHeart}
                      isCorrectUser={currentUser.id === b.user._id}
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
    currentUser: state.currentUser.user,
    favorites: state.currentUser.user.favorites || [],
    showFavourites: state.currentUser.showFavorites
  };
}


export default withRouter(connect(mapStateToProps, { fetchBlogs, deleteBlog, fetchPosts, favoriteBlog })(BlogList));