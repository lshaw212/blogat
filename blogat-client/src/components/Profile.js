import React, { Component } from "react";
import { Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import EditProfileForm from "../containers/EditProfileForm";
import { apiCall } from "../services/api";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      user: {},
      isLoading: false,
      show: false,
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
    let user = await apiCall("get", `/api/auth/user/${id}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err)
    });
    this.setState({user});
    this.setState({isLoading: true});
  }

  render(){
    const { user, isLoading } = this.state;
    
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
                <div>{user.username}</div>
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
                    handleClose={this.handleClose}
                  />
                </Modal>
              </div>
              <hr/>
              <div>{user.bio}</div>
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
          <div id="profile-blogs">
            {/* <div class="lds-dual-ring"></div> */}
          </div>
        </div>
      </div>
      : <div className="container">
        {/* Make this loading icon center of screen */}
          <div className="lds-dual-ring"></div>
        </div>
    )
  }

}

export default Profile;