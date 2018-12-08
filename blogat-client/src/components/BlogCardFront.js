import React from 'react';

const BlogCardFront =({text, desc, image}) => (
  <div className="blog-side side-front"> 
    <div id="blog-card-image" style={{backgroundImage: `url(${image})`}}>
    </div>
    <div id="blog-card-front-text">{text}</div>
  </div>
)

export default BlogCardFront;