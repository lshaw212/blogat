import React from "react";

// style={{backgroundImage: `url(${image})`}}

const BlogItem =({text, desc, image, username, date, isCorrectUser, selectBlog, removeBlog}) => (
  <div onClick={selectBlog} className="blogCard" >
    <button onClick={removeBlog}>DELETE</button>  
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

export default BlogItem;