import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SearchBox from "./SearchBox";
import FavouritesIcon from "./FavouritesIcon";

const CollapseItems = ({userProfile, newBlog, logout, pathname, showFavourites, favorite}) => (
  <Navbar.Collapse>
    <Nav>
    {(pathname.includes('blogs')) && 
      <div>
        <SearchBox />
        <FavouritesIcon
          showFavourites={showFavourites}
          favorite={favorite}
        />
      </div>
      }
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