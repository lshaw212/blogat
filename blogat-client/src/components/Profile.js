import React, { Component } from "react";
import Modal from "../containers/Modal";
import { apiCall } from "../services/api";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      user:{}
    }
  }
  componentDidMount(){
    this.loadUser();
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
    return(
      <div className="container">
        <div className="profile-layout">
          <div className="profile-information">
            <div className="profile-picture"></div>
            <div className="profile-details">
              <div className="profile-name-and-edit">
                <div>{user.username}</div>
                {/* <div><i class="far fa-edit fa-2x"></i></div> */}
                <Modal triggerText="Edit Profile" mProps={editProfileProps} btnClass="c-btn" btnText="Edit Profile" />
              </div>
              <hr/>
              <div>User description...</div>
              <div className="profile-social">
                <i class="fab fa-twitter fa-2x"></i>
                <i class="fab fa-linkedin-in fa-2x"></i>
                <i class="fab fa-github fa-2x"></i>
                <i class="fas fa-envelope-square fa-2x"></i>
              </div>
            </div>
            
          </div>
          <div className="profile-blogs">
            <div class="lds-dual-ring"></div>
          </div>
        </div>
      </div>
    )
  }

}

export default Profile;