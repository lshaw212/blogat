import React from "react";
import { Link } from "react-router-dom";
import BlogList from "../containers/BlogList";

const Homepage =({currentUser}) => {
  if(!currentUser.isAuthenticated){
    return(
      <div className="container">
        <div className="home-hero">
          <h1>Welcome to <strong>BLOG@</strong></h1>
          <h4>First time here?</h4>
          <Link to="/signup" className="btn btn-primary">Sign up here</Link>
        </div>
      </div>
    )
  }
  return (
    <div>
      <BlogList/>
    </div>
  )
}

export default Homepage;