import React from 'react';

const BlogCardFront =({text, desc, image}) => (
  <div className="blog-side side-front">
    <p>this is text {text}</p>
    <div className="image" style={{backgroundImage: `url(${image})`}}></div>
    <div id="blogTitle">
      <p>{text}</p>
    </div>
    <div id="blogDesc">
      <p>{desc}</p>
    </div>
    <div id="blogFav">
      <p>fav</p>
    </div>
    <div id="blogPost">
      <p>post</p>
    </div>
  </div>
)

export default BlogCardFront;