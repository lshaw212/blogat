import React from 'react';
import { Tab, Row, Nav, NavItem } from "react-bootstrap";

const Blog =({blogName}) => (
  <div className="tab-pane-test">
    {blogName}
  </div>
)

const Favourite =({blogName}) => (
  <div>
    {blogName}
  </div>
)

const ProfileBlogs = ({blogs}) => (
  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
    <Row className="clearfix">
      {/* <Col sm={4}> */}
        <Nav bsStyle="tabs">
          <NavItem className="profile-tab" eventKey="first">Blogs</NavItem>
          <NavItem className="profile-tab" eventKey="second">Favourites</NavItem>
        </Nav>
      {/* </Col> */}
      {/* <Col sm={8}> */}
        <Tab.Content animation>
          <Tab.Pane eventKey="first">
          {blogs.map(b => (
            <Blog blogName={b.blogName} id={b._id}/>
          ))}
          </Tab.Pane>
          <Tab.Pane eventKey="second">
          {/* {blogs.map(b => (
            <Favourite blogName={b} id={b._id}/>
          ))} */}
          </Tab.Pane>
        </Tab.Content>
      {/* </Col> */}
    </Row>
  </Tab.Container>
)

export default ProfileBlogs;