import React from "react";
import BlogCardFront from "./BlogCardFront";
import BlogCardBack from "./BlogCardBack";

// style={{backgroundImage: `url(${image})`}}

const BlogItem =({text, desc, image, username, favorite, profileImage, postCount, favCount, date, isCorrectUser, favToggle, selectBlog, removeBlog, ref}) => (
  <div onClick={selectBlog} className="blogCard" ref={ref} >
    <div className="blogBody">
      <BlogCardFront 
        text={text}
        image={image}
      />
      <BlogCardBack
        desc={desc}
        name={username}
        profileImage={profileImage}
        favToggle={favToggle}
        favorite={favorite}
        postCount={postCount}
        favCount={favCount}
      />
     </div>
  </div>
)

export default BlogItem;