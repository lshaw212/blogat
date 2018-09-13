import React from "react";
import Moment from "react-moment";
import Modal from "../containers/Modal";

const Post =({title, content, username, date, isCorrectUser, removePost, updatePost, postId, blogId}) => {
  
  const editPostProps = {
    ariaLabel: 'A label describing the Modal\'s current content',
    editPost: true,
    title: title,
    content: content
  };

  return(
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
          <Modal triggerText='Edit Post' postId={postId} blogId={blogId} mProps={editPostProps} />
        </div>
      )}
    </div>
  )
}

export default Post;