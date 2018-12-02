import React, { Component } from "react";
import { connect } from "react-redux";
import BlogItem from "../components/BlogItem";
import Loading from "../components/Loading";
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
      search: ""
    }
  }
  componentDidMount(){
    // Fetch blogs
    //debugger;
    this.loadBlogs();
    //debugger;
    this.props.fetchPosts();
    this.props.fetchFavorites();
    
  }

  updateQueryParam = obj => {
    this.props.history.push({
      search: `?${qs.stringify({
        ...qs.parse(this.props.location.search.replace("?", "")),
        ...obj
      })}`
    })
  }

  navigate = set => {
    this.props.history.push({
      pathname: `/${set.replace(/\s/g, "-")}`,
      search: this.props.location.search
    })
  }


  async loadBlogs(){
    this.setState({blogList: this.props.blogs});
    await this.props.fetchBlogs();
    this.setState({blogList: this.props.blogs});
  }
  searchBlogs(){
    if(this.state.search.length > 0){
      this.setState(({ blogList }) => ({
        blogList: blogList.filter(blog => blog.blogName === this.state.search)
      }));
    }
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

  findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
  }

  shuffle = () => 
  this.setState(({ blogList }) => ({
    blogList: shuffle(blogList)
  }));
  remove(){
    let test = this.findObjectByKey(this.state.blogList, 'blogName', 'lol');
    console.log(test);
    this.setState(({ blogList }) => ({
      blogList: blogList.filter(blog => blog.blogName === "test")
    }));
    // console.log(this.state.blogList[3].blogName);
    // this.setState(({blogList}) => ({
    //   blogList: (blogList.filter(blog === "test"))
    // }));
  }
  refresh(){
  this.setState({blogList: this.props.blogs});
  }
  
  render(){
    const { blogs, currentUser, favorites } = this.props;
    const queryParamState = {
      ...defaultState,
      ...qs.parse(this.props.location.search.replace("?", ""))
    }
    // const visibleIconSets = (
    //   queryParamState.sort
    // ).filter(
    //   set =>
    //   queryParamState.filter
    //     ? set.match(new RegExp("^" + queryParamState.filter))
    //     : true
    // )

    // console.log("blogs" + blogs);
    // map through your blog list
    //debugger;
    //let bloggers = blogs;

    // let blogList = this.state.blogList;

    const blogList = (this.state.blogList)
    .filter(blog => blog.blogName.includes(queryParamState.filter));

    return(
      (typeof blogs!=='undefined')?
        <div>
          <Flipper flipKey={this.state.blogList}>
            <input type="text" value={queryParamState.filter} onChange={e => this.updateQueryParam({ filter: e.target.value })}/>
            <div>
              <button onClick={this.shuffle.bind(this)}>shuffle</button>
              <button onClick={this.remove.bind(this)}>remove</button>
              <button onClick={this.refresh.bind(this)}>refresh</button>
            </div>
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