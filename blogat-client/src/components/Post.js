import React, { Component } from "react";
import Moment from "react-moment";
import { Modal, Dropdown, MenuItem } from "react-bootstrap";
import EditPostForm from "../containers/EditPostForm";

class Post extends Component {
  constructor(props){
    super(props);
    this.state={
      show:false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleClick(e){
    e.preventDefault();
    // Find out if this is needed?
    // this.props.onClick(e);
  }

  render(){
    const {title, content, image, layout, username, date, updatedAt, isCorrectUser, removePost, postId, blogId} = this.props;
    return(

      <div id="post-container">
        <div>
          <div id="post-title">{title}</div>
          <div id="post-details">
            <div className="post-details-text">Article by {username}</div>
            <div> | </div>
            <div className="post-details-text">
              {/* Shorthand text here would break the conditional rendering */}
              { this.props.date === this.props.updatedAt ? (
                <Moment fromNow>
                  {date}
                </Moment>
                ):(
                <div><Moment fromNow>{date}</Moment> (last updated <Moment fromNow>{updatedAt}</Moment>)</div>
                )}
            </div>
            {isCorrectUser && (
              <div id="post-edit">
                <Dropdown id="dropdown-custom-menu">
                <i className="far fa-edit fa-2x edit-icon" onClick={this.handleClick.bind(this)} bsRole="toggle"/>
                  <Dropdown.Menu className="dropdown-menu" bsRole="menu" style={{padding: ''}}>
                    <MenuItem onClick={this.handleShow}>Edit Post</MenuItem>
                    <MenuItem divider/>
                    <MenuItem onClick={removePost}>Delete Post</MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
                <Modal bsSize="large" show={this.state.show} onHide={this.handleClose}>
                  <EditPostForm
                    title={title}
                    content={content}
                    image={image}
                    layout={layout}
                    blogId={blogId}
                    postId={postId}
                    handleClose={this.handleClose}
                  />
                </Modal>
              </div>
            )}
          </div>
        </div>
        {layout === 1 && (
          <div>
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
            <div className="post-layout4-image" style={{backgroundImage: `url(${image})`}}></div>
            <div className="post-content">{content}</div>
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
}

// const Post =() => {
  
//   const editPostProps = {
//     ariaLabel: 'A label describing the Modal\'s current content',
//     editPost: true,
//     title: title,
//     content: content,
//     image: image,
//     layout: layout
//   };

  
// }

export default Post;