import React, { Component } from "react";
import { Modal, Tooltip, OverlayTrigger, Tabs, Tab } from 'react-bootstrap';
import EditProfileForm from "../containers/EditProfileForm";
import ProfileBlogs from "../components/ProfileBlogs";
import { apiCall } from "../services/api";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      user: {},
      isLoading: false,
      show: false,
      userFavourites:[]
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.goBlog = this.goBlog.bind(this);
    // this.selectBlog = this.selectBlog.bind(this);
  }
  componentDidMount(){
    this.loadUser();
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  async loadUser(){
    let id = this.props.match.params.id;
    let user = await apiCall("get", `/api/user/${id}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err)
    });

    let userFavourites = await apiCall("get", `/api/user/${id}/fav`);
    
    this.setState({user});
    this.setState({userFavourites});
    this.setState({isLoading: true});
  }
  updateProfile(user){
    // this.setState({user});
    console.log("Hello?");
    this.loadUser();
  }
  // Potential to refactor this to work as an action
  goBlog(blogId){
    // e.preventDefault();
    console.log("triggar");
    console.log(blogId);
    // this.setState({blogList: this.props.blogs})
    this.props.history.push({
      pathname:`/blogs/${blogId}`,
      state: {blogId: blogId}  
    });
  }

  render(){
    const { user, isLoading, userFavourites } = this.state;

    const tooltip = (
      <Tooltip>
        {user.email}
      </Tooltip>
    )
    return(
      (isLoading)?
      <div className="container">
        <div id="profile-layout">
          <div id="profile-information">
            <div id="profile-picture" style={{backgroundImage: `url(${user.profileImageUrl})`}}></div>
            <div id="profile-details">
              <div id="profile-name-and-edit">
                <div id="profile-username">{user.username}</div>
                {/* <div><i class="far fa-edit fa-2x"></i></div> */}
                {/* <Modal triggerText="Edit Profile" mProps={editProfileProps} btnClass="c-btn" btnText="Edit Profile" /> */}
                {/* <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                  test modal
                </Button> */}
                <i className="far fa-edit fa-2x" onClick={this.handleShow}></i>
                <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}> 
                  <EditProfileForm
                    userId={this.props.match.params.id}
                    bio={user.bio}
                    profileImageUrl={user.profileImageUrl}
                    twitter={user.social.twitter}
                    linkedin={user.social.linkedin}
                    github={user.social.github}
                    emailToggle={user.social.emailToggle}
                    updateProfile={this.updateProfile.bind(this)}
                    handleClose={this.handleClose}
                  />
                </Modal>
              </div>
              <div>
                <div id="profile-bio-info">{user.bio}</div>
                <div id="profile-social">
                  {user.social.twitter.length > 1 && (
                    <a href={`https://twitter.com/${user.social.twitter}`} ><i className="fab fa-twitter fa-2x"></i></a>
                  )}
                  {user.social.linkedin.length > 1 && (
                    <a href={`https://www.linkedin.com/in/${user.social.linkedin}`}><i className="fab fa-linkedin-in fa-2x"></i></a>
                  )}
                  {user.social.github.length > 1 && (
                    <a href={`https://github.com/${user.social.github}`}><i className="fab fa-github fa-2x"></i></a>
                  )}
                  {user.social.emailToggle && (
                    <OverlayTrigger placement="right" overlay={tooltip}>
                      <div>
                        <i className="fas fa-envelope-square fa-2x"></i>
                      </div>
                    </OverlayTrigger>
                  )}
                </div>
              </div>
            </div>
            
          </div>
          <div id="profile-blogs">
            <ProfileBlogs
              blogs={user.blogs}
              favourites={userFavourites}
              goBlog={this.goBlog.bind(this)}
            />
          </div>
        </div>
      </div>
      : <div className="container">
        {/* Make this loading icon center of screen */}
          <div id="loading-ring-container">
            <div className="lds-dual-ring"></div>
          </div>
        </div>
    )
  }

}

export default Profile;