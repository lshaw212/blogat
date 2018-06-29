import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

class Navbar extends Component {

  //logout
  logout = e => {
    e.preventDefault();
    this.props.logout();
  }

  render(){
    return(
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <p>Home</p>
            </Link>
          </div>
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <p>Welcome to Blog@ {this.props.currentUser.user.username}</p>
              </li>
              <li>
                <a onClick={this.logout}>Logout</a>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/signin">Log in</Link>
              </li>
            </ul>
          )}
          
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps,{logout})(Navbar);