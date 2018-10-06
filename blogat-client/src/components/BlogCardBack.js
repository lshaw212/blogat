import React from 'react';

const BlogCardBack =({desc, name, favToggle, favorite}) => (
  <div className="blog-side side-back">
    <div className="container-fluid">
      <div className="blog-back-desc">

      </div>
      <div id="blog-name">
        <p>created by {name}</p>
      </div>
      <div id="blog-fav">
        <i className={favorite} onClick={favToggle}/>
      </div>
    </div>
    
  </div>
)

export default BlogCardBack;