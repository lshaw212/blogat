import React from "react";
import Moment from "react-moment";
import Modal from "../containers/Modal";

const Post =({title, content, image, layout, username, date, updatedAt, isCorrectUser, removePost, updatePost, postId, blogId}) => {
  
  const editPostProps = {
    ariaLabel: 'A label describing the Modal\'s current content',
    editPost: true,
    title: title,
    content: content,
    image: image,
    layout: layout
  };

  return(

    <div>
      <div>
        <div id="post-title">{title}</div>
        <div id="post-details">
          <div className="post-details-text">Article by {username}</div>
          <div> | </div>
          <div className="post-details-text">
            {{date} === {updatedAt} ?
              <Moment fromNow>
                {date}
              </Moment>
              :
              <div>
                <Moment fromNow>{date}</Moment> (last updated <Moment fromNow>{updatedAt}</Moment>)</div>
            }
            
          </div>
        </div>
      </div>
      {layout === 1 && (
        <div>
          <div className="post-layout1-image" style={{backgroundImage: `url(${image})`}}></div>
          <div className="post-content">{content}</div>
        </div>
      )}
      {layout === 2 && (
        <div>
          <div className="post-layout2-image" style={{backgroundImage: `url(${image})`}}></div>
          <div className="post-content">{content}</div>
        </div>
      )}
      {layout === 3 && (
        <div>
          <div className="post-layout3-image" style={{backgroundImage: `url(${image})`}}></div>
          <div className="post-content">{content}</div>
        </div>
      )}
      {layout === 4 && (
        <div>
          <div className="post-content">{content}</div>
        </div>
      )}
      {isCorrectUser && (
        <div>
          <a onClick={removePost} className="btn btn-danger">delete post</a>
          <Modal
            triggerText='Edit Post'
            postId={postId}
            blogId={blogId}
            mProps={editPostProps}
            btnText='Edit Post'
            btnClass="c-btn"
          />
        </div>
      )}
    </div>


    // <div>
    //   <hr/>
    //   <p id="post-title">{title}</p>
    //   <div>
    //     <p className="post-content">{content}</p>
    //     <p>Article by {username}</p>
    //     <span>
    //       <Moment format="Do MMM YYYY">
    //         {date}
    //       </Moment>
    //     </span>
    //   </div>
    //   {isCorrectUser && (
    //     <div>
    //       <a onClick={removePost} className="btn btn-danger">delete post</a>
    //       <Modal triggerText='Edit Post' postId={postId} blogId={blogId} mProps={editPostProps} btnText='Edit Post' btnClass="c-btn" />
    //     </div>
    //   )}
    // </div>
  )
}

export default Post;