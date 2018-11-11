import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { Dropdown, MenuItem } from "react-bootstrap";

class Navbar extends Component {

  //logout
  logout = e => {
    e.preventDefault();
    this.props.logout();
  }
  profileClicked = e => {
    console.log("Hiiii");
    e.preventDefault();
  }
  userProfile(id, e){
    console.log("Hehehehe");
    this.props.history.push({
      pathname:`/user/${id}`,
      state: {id: id}  
    });
  }
  newBlog(id, e){
    console.log("New blog");
    this.props.history.push({
      pathname:`/users/${id}/blog/new`
    });
  }


  render(){
    return(
      <nav className="navbar navbar-expand">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <p>Blog@</p>
            </Link>
            <Link to={`/users/${this.props.currentUser.user.id}/blog/new`} >New Blog</Link>
          </div>
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <div>
                  <Dropdown id="dropdown-custom-menu">
                    <div className="navbar-profile" onClick={this.profileClicked.bind(this)} bsRole="toggle"></div>
                    <Dropdown.Menu className="dropdown-menu" bsRole="menu" style={{padding: ''}}>
                      <MenuItem onClick={this.userProfile.bind(this, this.props.currentUser.user.id)}><i className="fas fa-user"></i> Profile</MenuItem>
                      <MenuItem onClick={this.newBlog.bind(this, this.props.currentUser.user.id)}><i className="fas fa-newspaper"></i> New Blog</MenuItem>
                      <MenuItem divider />
                      <MenuItem onClick={this.logout.bind(this)}><i className="fas fa-sign-out-alt"></i> Logout</MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
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

export default withRouter(connect(mapStateToProps,{ logout })(Navbar));