import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

// style={{backgroundImage: `url(${image})`}}

const BlogItem =({text, desc, image, username, date, isCorrectUser}) => (
  <div className="blogCard" >
    <div className="image" style={{backgroundImage: `url(${image})`}}></div>
    
    
    <div id="desc">
    <p>{text}</p>
      <p>{desc}</p>
    </div>
    <div>
    {/* <img src={image} alt=""/> */}
      <div>
        {/* favourite count */}
      </div>
      <div>
        {/* post count */}
      </div>
    </div>
    
  </div>
)

export default BlogItem;