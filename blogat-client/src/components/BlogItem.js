import React from "react";
import BlogCardFront from "./BlogCardFront";
import BlogCardBack from "./BlogCardBack";

// style={{backgroundImage: `url(${image})`}}

const BlogItem =({text, desc, image, username, favorite, date, isCorrectUser, favToggle, selectBlog, removeBlog}) => (
  <div onClick={selectBlog} className="blogCard" >
    <div className="blogBody">
      <BlogCardFront 
        text={text}
        image={image}
      />
      <BlogCardBack
        desc={desc}
        name={username}
        favToggle={favToggle}
        favorite={favorite}
      />
     </div>
  </div>
)

export default BlogItem;