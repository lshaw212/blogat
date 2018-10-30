import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

class Navbar extends Component {

  //logout
  logout = e => {
    e.preventDefault();
    this.props.logout();
  }
  profileClicked = e => {
    console.log("Hiiii");
    document.getElementById("myDropdown").classList.toggle("show");
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
                <div className="dropdown">
                  <div className="navbar-profile" onClick={this.profileClicked.bind(this)}></div>
                  <div id="myDropdown" className="dropdown-content">
                    <div onClick={this.userProfile.bind(this, this.props.currentUser.user.id)}><i class="fas fa-user"></i> Profile</div>
                    <div onClick={this.newBlog.bind(this, this.props.currentUser.user.id)}><i class="fas fa-newspaper"></i> New Blog</div>
                    <div onClick={this.logout.bind(this)}><i class="fas fa-sign-out-alt"></i> Logout</div>
                    {/* <div><a href=""> Profile</a></div> 
                    <div><a href=""><i class="fas fa-newspaper"></i> New Blog</a></div>
                    <div><a href=""><i class="fas fa-sign-out-alt"></i> Logout</a></div> */}
                  </div>
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