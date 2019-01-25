import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "./forms/AuthForm";
import { Modal } from "react-bootstrap";

class Homepage extends Component {
  constructor(props){
    super(props);
    this.state={
      show: false,
      login: false,
      signup: false,
      timerText: 0,
      spanText: "Test Text 0"
    }
    this.handleLoginShow = this.handleLoginShow.bind(this);
    this.handleSignupShow = this.handleSignupShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.skip = this.skip.bind(this);
  }
  handleClose() {
    this.setState({ show: false, login: false, signup: false });
  }

  handleLoginShow() {
    this.setState({show: true, login: true});
  }
  handleSignupShow(){
    this.setState({show: true, signup: true});
  }
  handleRegister(){
    this.handleClose();
    this.handleSignupShow();
  }
  skip(){
    this.props.history.push({
      pathname:`/blogs`
    });
  }

  render(){
    const { currentUser } = this.props;
    
    if(!currentUser.isAuthenticated){
      return(
        <div className="homepage-container">
          <ul className="background-loop">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="home-hero">
            <p id="title-text">Blog@</p>
            <p className="desc-text">Welcome to Blog@, where you can create and share blogs with everyone.</p>
            <p className="desc-text">Create your first blog now about 
              <div className="sliding-vertical">
                <span>Adventure</span>
                <span>Literature</span>
                <span>Technology</span>
                <span>Sport</span>
                <span>Animals</span>
                <span>Food</span>
              </div>
            </p>
            <div className="homepage-btn-container">
              <div>
                <button onClick={this.handleLoginShow} className="homepage-btn">Log In</button>
              </div>
              <div>
                <button onClick={this.handleSignupShow} className="homepage-btn">Sign Up</button>
                <button onClick={this.skip} className="homepage-btn skip-btn">skip</button>
              </div>
              <Modal bsSize="small" show={this.state.show} onHide={this.handleClose} style={{top: '25%', borderRadius: '5px !important'}}>
                {this.state.login &&
                  <AuthForm
                    buttonText="Log in"
                    heading="Welcome back!"
                    login
                    register={this.handleRegister}
                    // {...props}
                  />
                }
                {this.state.signup &&
                  <AuthForm
                    buttonText="Sign me up!"
                    heading="Register at Blog@"
                    signUp
                    // {...props}
                  />
                }
              </Modal>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        {/* Redirect if logged in to BlogList */}
        <Redirect to="/blogs" />
        {/* <BlogList/> */}
      </div>
    )
  }
}

export default Homepage;