import React from 'react';
import { Tab, Row, Nav, NavItem } from "react-bootstrap";

const Blog =({blogName, blogDescription, blogImage, blogId, goBlog}) => (
  <div className="tab-blog" onClick={goBlog.bind(this, blogId)} >
    <div className="tab-blog-info">
      <div className="tab-blog-name">{blogName}</div>
      <div className="tab-blog-desc">"{blogDescription}"</div>
    </div>
    <div className="tab-blog-test">
      <div className="tab-blog-image" style={{backgroundImage: `url(${blogImage})`}}></div>
    </div>
    
    
    
    {/* <div className="tab-blog-image" style={{backgroundImage: `url(${blogImage})`}}></div> */}
  </div>
)

const Favourite =({blogName}) => (
  <div>
    {blogName}
  </div>
)

const ProfileBlogs = ({blogs, favourites, goBlog}) => (
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
            <div className="tab-pane-container">
              {blogs.map(b => (
                <Blog
                  key={b._id}
                  blogName={b.blogName}
                  blogDescription={b.blogDescription}
                  blogImage={b.blogImage}
                  goBlog={goBlog}
                  blogId={b._id}
                />
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <div className="tab-pane-container">
            {favourites.map(b => (
                <Blog
                  key={b._id}
                  blogName={b.blogName}
                  blogDescription={b.blogDescription}
                  blogImage={b.blogImage}
                  goBlog={goBlog}
                  blogId={b._id}
                />
              ))}
            </div>
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