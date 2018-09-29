import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Modal from "../containers/Modal";

class Homepage extends Component {
  constructor(props){
    super(props);
    this.state={
      timerText: 0,
      spanText: "Test Text 0"
    }
    
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
            <p id="titleText">Blog<strong>@</strong></p>
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
              <Modal mProps="signin" btnText='Log In' btnClass="infoBtn" />
              <Modal mProps="signup" btnText='Sign Up' btnClass="infoBtn" />
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