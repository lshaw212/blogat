import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const BlogItem =({text, desc, image, username, date, isCorrectUser}) => (
  <li className="list-group-item"  >
    
    <div>
      
      <p>{text}</p>
      <div id="desc">
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
  </li>
)

export default BlogItem;