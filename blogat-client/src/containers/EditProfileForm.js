import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from 'react-bootstrap';

class EditProfileForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      // profileImageUrl: this.props.profileImageUrl,
      // bio: this.props.bio,
      // twitter: this.props.twitter,
      // linkedin: this.props.linkedin,
      // github: this.props.github,
      // emailToggle: this.props.emailToggle
    }
  }

  componentDidMount(){

  }

  handleSubit = e => {
    e.preventDefault();

    // updateProfile
  }

  render(){
    const { handleClose } =this.props;
    return(
      <div className="form-modal">
        <div className="form-header">Edit your profile</div>
        <hr/>
        <form onSubmit={this.handleSubit}>
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
                value={this.state.desc}
                onChange={e => this.setState({desc: e.target.value})}
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
              <input
                type="text"
                className="form-control"
                value={this.state.twitter}
                onChange={e => this.setState({twitter: e.target.value})}
              />
              <div className="social-size">Linkedin</div>
              <input
                type="text"
                className="form-control"
                value={this.state.linkedin}
                onChange={e => this.setState({linkedin: e.target.value})}
              />
              <div className="social-size">Github</div>
              <input
                type="text"
                className="form-control"
                value={this.state.github}
                onChange={e => this.setState({github: e.target.value})}
              />
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
                onChange={e => this.setState({})}
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