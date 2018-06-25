import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {

  //logout

  render(){
    return(
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <p>Home</p>
            </Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/signin">Log in</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;