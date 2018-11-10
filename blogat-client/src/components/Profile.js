import React, { Component } from "react";
// import Modal from "../containers/Modal";
// import Modal from "react-bootstrap/lib";
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import EditProfileForm from "../containers/EditProfileForm";
import { apiCall } from "../services/api";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      user:{},
      show: false
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
      console.log("hehe");
      console.log(res);
      return res;
    })
    .catch(err => {
      console.log(err)
    });
    this.setState({user});
    console.log("KJAHGDSKHSAD");
    console.log(user);
  }

  render(){
    const { user } = this.state;
    const editProfileProps = {
      editProfile: true,
      profileImageUrl: user.profileImageUrl,
      bio: user.bio,
      // twitter: user.social.twitter,
      // linkedin: user.social.linkedin,
      // github: user.social.github,
      // emailToggle: user.social.emailToggle
    }
    const tooltip = (
      <Tooltip>
        Email
      </Tooltip>
    )
    return(
      <div className="container">
        <div className="profile-layout">
          <div className="profile-information">
            <div className="profile-picture"></div>
            <div className="profile-details">
              <div className="profile-name-and-edit">
                <div>{user.username}</div>
                {/* <div><i class="far fa-edit fa-2x"></i></div> */}
                {/* <Modal triggerText="Edit Profile" mProps={editProfileProps} btnClass="c-btn" btnText="Edit Profile" /> */}
                {/* <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                  test modal
                </Button> */}
                <i className="far fa-edit fa-2x" onClick={this.handleShow}></i>
                <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}> 
                  <EditProfileForm handleClose={this.handleClose} />
                </Modal>
              </div>
              <hr/>
              <div>User description...</div>
              <div className="profile-social">
                <i className="fab fa-twitter fa-2x"></i>
                <i className="fab fa-linkedin-in fa-2x"></i>
                <i className="fab fa-github fa-2x"></i>
                
                  <OverlayTrigger placement="right" overlay={tooltip}>
                  <div>
                    <i className="fas fa-envelope-square fa-2x"></i>
                  </div>
                    
                  </OverlayTrigger>
                
              </div>
            </div>
            
          </div>
          <div className="profile-blogs">
            {/* <div class="lds-dual-ring"></div> */}
          </div>
        </div>
      </div>
    )
  }

}

export default Profile;