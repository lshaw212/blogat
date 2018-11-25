import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const BlogCardBack =({desc, name, favToggle, favorite, profileImage, postCount, favCount}) => (
  <div className="blog-side side-back">
    <div id="blog-back-desc">
      {desc}
    </div>
    <div id="blog-back-information">
      <div className="blog-back-icons">
        <i className={favorite} onClick={favToggle}/>
      </div>
      <div className="blog-back-icons">
        <i data-feather="eye"></i>
      </div>
      <div>
        <OverlayTrigger placement="right" overlay={<Tooltip>{name}</Tooltip>} delayShow={300} >
          <div id="blog-back-profile-image" style={{backgroundImage: `url(${profileImage})`}}></div>
        </OverlayTrigger>
      </div>
    </div> 
  </div>
)

export default BlogCardBack;


{/* <div id="blog-name">
  <div id="blog-back-profile-image" style={{backgroundImage: `url(${profileImage})`}}></div>
  <div id="blog-back-profile-name">{name}</div>
</div>
<div id="blog-back-info-stats">
  <div>
    <i className="far fa-newspaper fa-3x"></i>
  </div>
  <div className="blog-back-info-stats-text">
    {postCount}
  </div>
  <div>
    <i className={favorite} onClick={favToggle}/>
  </div>
  <div className="blog-back-info-stats-text">
    {favCount}
  </div>
</div> */}