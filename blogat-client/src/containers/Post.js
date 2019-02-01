import React, { Component } from "react";
import Moment from "react-moment";
import { Modal, Dropdown } from "react-bootstrap";
import EditPostForm from "./forms/EditPostForm";

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
    this.setState({show: false});
  }

  handleShow() {
    this.setState({show: true});
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
                  <Dropdown.Item onClick={this.handleShow}>Edit Post</Dropdown.Item>
                  <Dropdown.Item divider/>
                  <Dropdown.Item onClick={removePost}>Delete Post</Dropdown.Item>
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
        {layout === 1 && (
          <div>
            <div className="post-content">{content}</div>
          </div>
        )}
        {layout === 2 && (
          <div>
            <div className="post-layout-image post-layout-2" style={{backgroundImage: `url(${image})`}}></div>
            <div className="post-content">{content}</div>
          </div>
        )}
        {layout === 3 && (
          <div>
            <div className="post-layout-image post-layout-3" style={{backgroundImage: `url(${image})`}}></div>
            <div className="post-content">{content}</div>
          </div>
        )}
        {layout === 4 && (
          <div>
            <div className="post-layout-image post-layout-4" style={{backgroundImage: `url(${image})`}}></div>
            <div className="post-content">{content}</div>
          </div>
        )}
      </div>
    )
  }
}

export default Post;