import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const Post =({title, content, username, date, isCorrectUser, removePost, updatePost, postId, blogId}) => (
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
    {isCorrectUser && (
      <div>
        <a onClick={removePost} className="btn btn-danger">delete post</a>
        <Link to={{
          pathname:`/post/${postId}/edit`,
          state: {blogId: blogId}
        }}>Edit post</Link>
        {/* <a onClick={updatePost} className="btn btn-danger">update post</a> */}
      </div>
    )}
  </div>
)

export default Post;