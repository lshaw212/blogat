import React from 'react';
import { Modal, Navbar, Nav, NavItem } from 'react-bootstrap';
import AuthForm from "../AuthForm";

const LoginItems = ({handleLogin, handleSignup, handleRegister, modalShow, modalHide, login, signup}) => (
  <Navbar.Collapse>
    <Nav pullRight className="navbar-testing">
      <NavItem onClick={handleLogin} className="">Log In</NavItem>
      <NavItem onClick={handleSignup} className="">Sign Up</NavItem>
      <Modal bsSize="small" show={modalShow} onHide={modalHide} style={{top: '25%', borderRadius: '5px !important'}}>
        {login &&
          <AuthForm
            buttonText="Log in"
            heading="Welcome back!"
            login
            register={handleRegister}
          />
        }
        {signup &&
          <AuthForm
            buttonText="Sign me up!"
            heading="Register at Blog@"
            signUp
            // Add a skip for register
          />
        }
      </Modal>
    </Nav>
  </Navbar.Collapse>
)

export default LoginItems;