import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
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
  }
  handleClose() {
    this.setState({ show: false, login: false, signup: false });
  }

  handleLoginShow() {
    this.setState({ show: true, login: true });
  }
  handleSignupShow(){
    this.setState({ show: true, signup: true});
  }
  handleRegister(){
    this.handleClose();
    this.handleSignupShow();
  }

  render(){
    const { currentUser } = this.props;
    
    if(!currentUser.isAuthenticated){
      return(
        <div className="homepageTest">
          <ul className="backgroundLoop">
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
          </ul>
          <div className="home-hero">
            <p id="titleText">Blog@</p>
            <p className="descText">Welcome to Blog@, where you can create and share blogs with everyone.</p>
            <p className="descText">Create your first blog now about 
              <div className="slidingVertical">
                <span>Adventure</span>
                <span>Literature</span>
                <span>Technology</span>
                <span>Sport</span>
                <span>Animals</span>
                <span>Food</span>
              </div>
            </p>
            <div className="btnContainer">
              <button onClick={this.handleLoginShow} className="infoBtn">Log In</button>
              <button onClick={this.handleSignupShow} className="infoBtn">Sign Up</button>
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