import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import EditProfileForm from "./forms/EditProfileForm";
import ProfileBlogs from "../components/ProfileBlogs";
import { apiCall } from "../services/api";
import { withRouter } from "react-router-dom";

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
  }
  componentDidMount(){
    this.loadUser();
  }

  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname)
      this.loadUser();
  }

  handleClose(){
    this.setState({show: false});
  }
  handleShow(){
    this.setState({show: true});
  }

  async loadUser(){
    let id = this.props.match.params.id;
    let user = await apiCall("get", `/api/users/${id}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });

    let userFavourites = await apiCall("get", `/api/favourites/${id}`);
    
    this.setState({user,userFavourites,isLoading: true});
  }
  updateProfile(){
    this.loadUser();
  }

  // Potential to refactor this to work as an action
  goBlog(blogId){
    this.props.history.push({
      pathname:`/blog/${blogId}`,
      state: {blogId: blogId}  
    });
  }

  render(){
    const { user, isLoading, userFavourites } = this.state;
    const { currentUser } = this.props;
    const tooltip = (
      <Tooltip>
        {user.email}
      </Tooltip>
    )
    return(
      (isLoading)?
      <div className="container profile-container">
        <div id="profile-layout">
          <div id="profile-information">
            <div id="profile-picture" style={{backgroundImage: `url(${user.profileImageUrl})`}}></div>
            <div id="profile-details">
              <div id="profile-name-and-edit">
                <div id="profile-username">{user.username}</div>
                {currentUser === user._id && (
                  <div>
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
                )}
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

function mapStateToProps(state){
  return {
    currentUser: state.currentUser.user.id
  };
}

export default withRouter(connect(mapStateToProps)(Profile));