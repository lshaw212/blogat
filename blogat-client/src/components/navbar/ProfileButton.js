import React from 'react';
import { Dropdown } from 'react-bootstrap';
import CustomToggle from "./CustomToggle";
import CustomMenu from "./CustomMenu";

const ProfileButton = ({userProfile, newBlog, logout, imageStyle, profileClicked}) => (
  
    <Dropdown id="dropdown-custom-menu">
      <div className="navbar-profile" style={imageStyle} onClick={profileClicked} bsRole="toggle"></div>
      {/* <Dropdown.Toggle id="dropdown-custom-components" style={imageStyle} as={CustomToggle}/> */}
      <Dropdown.Menu className="dropdown-menu" bsRole="menu" style={{padding: ''}}>
      {/* <Dropdown.Menu as={CustomMenu}> */}
        <Dropdown.Item onClick={userProfile}><i className="fas fa-user"></i> Profile</Dropdown.Item>
        <Dropdown.Item onClick={newBlog}><i className="fas fa-newspaper"></i> New Blog</Dropdown.Item>
        <Dropdown.Item divider />
        <Dropdown.Item onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
)

export default ProfileButton;