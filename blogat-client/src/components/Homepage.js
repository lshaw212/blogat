import React from "react";
import { Redirect } from "react-router-dom";
import Modal from "../containers/Modal";

const signinProps = {
  ariaLabel: 'A label describing the Modal\'s current content',
  signin: true
}
const signUpProps = {
  ariaLabel: 'A label describing the Modal\'s current content',
  signup: true
}

const Homepage =({currentUser}) => {
  if(!currentUser.isAuthenticated){
    return(
      <div className="container">
        <div className="home-hero">
          <h1>Blog<strong>@</strong></h1>
          <h4>Welcome to Blog@, where you can create and share blogs with everyone.</h4>
          <h4>Create your first blog now about *******</h4>
          {/* <Link to="/signup" className="btn btn-primary">Sign up here</Link> */}
        </div>
        <div>
          <Modal mProps={signinProps} triggerText='Log In' />
          <Modal mProps={signUpProps} triggerText='Sign Up' />
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

export default Homepage;