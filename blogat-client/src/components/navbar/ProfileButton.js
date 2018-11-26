import React from 'react';
import { Nav, Dropdown, MenuItem } from 'react-bootstrap';

const ProfileButton = ({userProfile, newBlog, logout, imageStyle, profileClicked}) => (
  <Nav pullRight className="navbar-testing" >
    <Dropdown id="dropdown-custom-menu">
      <div className="navbar-profile" style={imageStyle} onClick={profileClicked} bsRole="toggle"></div>
      <Dropdown.Menu className="dropdown-menu" bsRole="menu" style={{padding: ''}}>
        <MenuItem onClick={userProfile}><i className="fas fa-user"></i> Profile</MenuItem>
        <MenuItem onClick={newBlog}><i className="fas fa-newspaper"></i> New Blog</MenuItem>
        <MenuItem divider />
        <MenuItem onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  </Nav>
)

export default ProfileButton;