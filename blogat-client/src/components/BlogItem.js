import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const BlogItem =({text, desc, username, date, isCorrectUser}) => (
  <li className="list-group-item">
    <div>
      <p>{text}</p>
      <div id="desc">
        <p>{desc}</p>
      </div>
      <div>
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