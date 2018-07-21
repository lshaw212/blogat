import React from "react";
import Moment from "react-moment";

const Post =({title, content, username, date}) => (
  <div>
    <hr/>
    <h3>{title}</h3>
    <div>
      <p>{content}</p>
      <p>Article by {username}</p>
      <span>
        <Moment format="Do MMM YYYY">
          {date}
        </Moment>
      </span>
    </div>
  </div>
)

export default Post;