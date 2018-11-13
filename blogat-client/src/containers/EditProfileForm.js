import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, InputGroup } from 'react-bootstrap';
import { apiCall } from "../services/api";

class EditProfileForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      profileImageUrl: this.props.profileImageUrl,
      bio: this.props.bio,
      twitter: this.props.twitter,
      linkedin: this.props.linkedin,
      github: this.props.github,
      emailToggle: this.props.emailToggle
    }
  }

  componentDidMount(){

  }

  handleSubmit = e => {
    e.preventDefault();
    this.profileImageChecker(this.state.profileImageUrl);
    console.log(this.state.profileImageUrl);
    this.updateUser(this.state.profileImageUrl,this.state.bio,this.state.twitter,this.state.linkedin,this.state.github,this.state.emailToggle);
    // updateProfile
  }
  profileImageChecker(image){
    if(image.indexOf('i.imgur.com') > -1)
      console.log("Y")
    else
      this.setState({profileImageUrl: 'https://i.imgur.com/Mc3lrXL.jpg'});
      console.log("W");
  }

  async updateUser(profileImageUrl,bio,twitter,linkedin,github,emailToggle){
    let id = this.props.userId
    let user = await apiCall("put", `/api/auth/user/${id}`, {profileImageUrl,bio,twitter,linkedin,github,emailToggle})
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
    const { handleClose } =this.props;
    return(
      <div className="form-modal">
        <div className="form-header">Edit your profile</div>
        <hr/>
        <form onSubmit={this.handleSubmit}>
        {/* error handling */}
          <div className="input-section">
            <div className="input-section-text">
              <label className="input-section-text-title" htmlFor="bio">Bio</label>
              <div className="input-section-text-extra">Create a short Bio and let other users know a little more about you</div>
            </div>
            <div className="input-section-input">
              <textarea
                cols="30"
                rows="2"
                type="text"
                className="form-control"
                value={this.state.bio}
                onChange={e => this.setState({bio: e.target.value})}
              />
            </div>
          </div>
          <hr/>
          <div className="input-section">
            <div className="input-section-text">
              <label htmlFor="image">Profile Image URL</label>
              <div className="input-section-text-extra">Use imgur.com to upload a profile image to use, otherwise leave field blank to use the default profile image</div>
            </div>
            <div className="input-section-input">
              <input
                type="text"
                className="form-control"
                value={this.state.profileImageUrl}
                onChange={e => this.setState({profileImageUrl: e.target.value})}
              />
            </div>
          </div>
          <hr/>
          <div className="input-section">
            <div className="input-section-text">
              <label htmlFor="social">Social</label>
              <div className="input-section-text-extra">Let users know of your other social media accounts</div>
            </div>
            <div className="input-section-input">
            <div className="social-size">Twitter</div>
              <InputGroup>
                <InputGroup.Addon>https://twitter.com/</InputGroup.Addon>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.twitter}
                  onChange={e => this.setState({twitter: e.target.value})}
                />
              </InputGroup>
              <div className="social-size">Linkedin</div>
              <InputGroup>
                <InputGroup.Addon>https://www.linkedin.com/in/</InputGroup.Addon>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.linkedin}
                  onChange={e => this.setState({linkedin: e.target.value})}
                />
              </InputGroup>
              <div className="social-size">Github</div>
              <InputGroup>
                <InputGroup.Addon>https://github.com/</InputGroup.Addon>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.github}
                  onChange={e => this.setState({github: e.target.value})}
                />
              </InputGroup>
            </div>
          </div>
          <hr/>
          <div className="input-section">
            <div className="input-section-text">
              <label htmlFor="email">Email</label>
              <div className="input-section-text-extra">Tick the box to let other users contact you by email.</div>
            </div>
            <div className="input-section-input">
              {/* Toggle for Email */}
              <input
                type="checkbox"
                value={this.state.emailToggle}
                defaultChecked={this.state.emailToggle}
                onChange={() => this.setState({emailToggle: !this.state.emailToggle})}
              />
            </div>
          </div>
          <hr/>
          <div className="input-buttons">
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button className="form-submit" type="submit" className="btn btn-success pull-right">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{

  };
}

export default connect(mapStateToProps, {})(EditProfileForm);