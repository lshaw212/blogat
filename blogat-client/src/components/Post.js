import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import EditPostForm from "../containers/EditPostForm"
import Modal from "../containers/Modal";

const editPostProps = {
  ariaLabel: 'A label describing the Modal\'s current content',
  triggerText: 'Edit your post',
  editPost: true
};
// eProps fix
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
        <Modal {...editPostProps} postId={postId} blogId={blogId} eProps={editPostProps} />
      </div>
    )}
  </div>
)

export default Post;