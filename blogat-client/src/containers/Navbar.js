import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import { Modal, Dropdown, MenuItem, Navbar, Nav, FormGroup, FormControl } from "react-bootstrap";
import AuthForm from "../components/AuthForm";
import ProfileButton from '../components/navbar/ProfileButton';
import CollapseItems from '../components/navbar/CollapseItems';
import LoginItems from '../components/navbar/LoginItems';
import SearchBox from "../components/navbar/SearchBox";

class NavbarComponent extends Component {

  constructor(props){
    super(props);
    this.state={
      show: false,
      login: false,
      signup: false,
      isDesktop: false
    }
    this.handleLoginShow = this.handleLoginShow.bind(this);
    this.handleSignupShow = this.handleSignupShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
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

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 767 });
  }


  render(){
    const {isDesktop, show, login, signup} = this.state;
    return(
      <Navbar collapseOnSelect>
      <div className="navbar-main">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                <div>BLOG@</div>
              </Link>   
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          {(isDesktop) &&
            <Nav>
              <Navbar.Form>
                <SearchBox />
              </Navbar.Form>
            </Nav>
          }
          {this.props.currentUser.isAuthenticated ? (
            <Nav pullRight className="navbar-testing" >
              {isDesktop ? (
                  <ProfileButton
                    imageStyle={{backgroundImage: `url(${this.props.currentUser.user.profileImageUrl})`}}  
                    profileClicked={this.profileClicked.bind(this)}
                    userProfile={this.userProfile.bind(this, this.props.currentUser.user.id)}
                    newBlog={this.newBlog.bind(this, this.props.currentUser.user.id)}
                    logout={this.logout.bind(this)}
                  />
                ) : (
                  <CollapseItems
                    userProfile={this.userProfile.bind(this, this.props.currentUser.user.id)}
                    newBlog={this.newBlog.bind(this, this.props.currentUser.user.id)}
                    logout={this.logout.bind(this)}
                  />
                )}
              </Nav>
          ) : (
            <LoginItems 
              handleLogin={this.handleLoginShow}
              handleSignup={this.handleSignupShow}
              handleRegister={this.handleRegister}
              modalShow={show}
              modalHide={this.handleClose}
              login={login}
              signup={signup}
            />
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