import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const BlogItem =({text, username, date, isCorrectUser}) => (
  <div>
    <li className="list-group-item">
      <div>
        <p>{text}</p>
      </div>
    </li>
  </div>
)

export default BlogItem;