import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { Modal, Dropdown, MenuItem, Navbar, Nav } from "react-bootstrap";
import AuthForm from "../components/AuthForm";

class NavbarComponent extends Component {

  constructor(props){
    super(props);
    this.state={
      show: false,
      login: false,
      signup: false
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
  //logout
  logout = e => {
    e.preventDefault();
    this.props.logout();
  }
  profileClicked = e => {
    e.preventDefault();
  }
  userProfile(id, e){
    this.props.history.push({
      pathname:`/user/${id}`,
      state: {id: id}  
    });
  }
  newBlog(id, e){
    this.props.history.push({
      pathname:`/users/${id}/blog/new`
    });
  }


  render(){
    return(
      <Navbar style={{height: '70px'}}>
      <div >
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="navbar-brand">
                <div>BLOG@</div>
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
          {this.props.currentUser.isAuthenticated ? (
            <Nav pullRight className="navbar-testing" >
              <Dropdown id="dropdown-custom-menu">
                <div className="navbar-profile" style={{backgroundImage: `url(${this.props.currentUser.user.profileImageUrl})`}} onClick={this.profileClicked.bind(this)} bsRole="toggle"></div>
                <Dropdown.Menu className="dropdown-menu" bsRole="menu" style={{padding: ''}}>
                  <MenuItem onClick={this.userProfile.bind(this, this.props.currentUser.user.id)}><i className="fas fa-user"></i> Profile</MenuItem>
                  <MenuItem onClick={this.newBlog.bind(this, this.props.currentUser.user.id)}><i className="fas fa-newspaper"></i> New Blog</MenuItem>
                  <MenuItem divider />
                  <MenuItem onClick={this.logout.bind(this)}><i className="fas fa-sign-out-alt"></i> Logout</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            <Nav pullRight className="navbar-testing">
              <li><button onClick={this.handleLoginShow} className="">Log In</button></li>
              <li><button onClick={this.handleSignupShow} className="">Sign Up</button></li>
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
            </Nav>
          )}
          </div>
      </Navbar>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(connect(mapStateToProps,{ logout })(NavbarComponent));