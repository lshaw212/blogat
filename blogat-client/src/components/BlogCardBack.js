import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


const BlogCardBack =({desc, name, favToggle, favorite, profileImage, postCount, favCount}) => (
  <div className="blog-side side-back">
    <div id="blog-back-desc">
      {desc}
    </div>
    <div id="blog-back-information">
      <div>
        <OverlayTrigger placement="bottom" overlay={<Tooltip>{name}</Tooltip>} delayShow={300} >
          <div id="blog-back-profile-image" style={{backgroundImage: `url(${profileImage})`}}></div>
        </OverlayTrigger>
      </div>
      <div className="blog-back-icons">
        <i className="far fa-newspaper fa-2x"/>
        <div className="blog-back-icons-text">{postCount}</div>
      </div>
      <div className="blog-back-icons" onClick={favToggle} >
        <i className="fas fa-heart fa-2x" style={favorite}/>
        <div className="blog-back-icons-text">{favCount}</div>
      </div>
    </div> 
  </div>
)

export default BlogCardBack;