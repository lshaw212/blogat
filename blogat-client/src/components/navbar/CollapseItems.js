import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SearchBox from "./SearchBox";

const CollapseItems = ({userProfile, newBlog, logout}) => (
  <Navbar.Collapse>
    <Nav>
      <SearchBox />
      <NavItem onClick={userProfile}>
        Profile
      </NavItem>
      <NavItem onClick={newBlog}>
        New blog
      </NavItem>
      <NavItem onClick={logout}>
        Logout
      </NavItem>
    </Nav>
  </Navbar.Collapse>
)

export default CollapseItems;