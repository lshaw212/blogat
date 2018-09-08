import React, { Component } from "react";
import ModalTrigger from "../containers/ModalTrigger";
import ModalContent from "../containers/ModelContent";

class Modal extends Component {
  state = { isOpen: false };

  onOpen = () => {
    this.setState({isOpen: true}, () => {
      this.closeButtonNode.focus();
    });
    this.toggleScrollLock();
  };

  onClose = () => {
    this.setState({isOpen: false});
    this.openButtonNode.focus();
    this.toggleScrollLock();
  }

  onKeyDown = ({ keyCode }) => keyCode === 27 && this.onClose();
  toggleScrollLock = () => document.querySelector('html').classList.toggle('u-lock-scroll');
  // onKeyDown = (event) => {
  //   return event.keyCode === 27 && this.onClose();
  // }
  onClickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.onClose();
  };


  render(){
    const { isOpen } = this.state;
    const { triggerText, role, ariaLabel, children, postId, blogId, editPost, newPost, editBlog, signin, signup } = this.props;
    return(
      <div>
        <ModalTrigger
          onOpen={this.onOpen}
          buttonRef={n => this.openButtonNode = n}
          text={triggerText}
        />
        {isOpen &&
          <ModalContent
            content={children}
            ariaLabel={ariaLabel}
            buttonRef={n => this.closeButtonNode = n}
            modalRef={n => this.modalNode = n}
            onClickAway={this.onClickAway}
            onClose={this.onClose}
            onKeyDown={this.onKeyDown}
            postId={postId}
            blogId={blogId}
            editPost={editPost}
            newPost={newPost}
            editBlog={editBlog}
            signin={signin}
            signup={signup}
            role={role}
          />
        }
      </div>
    );
  }
}

export default Modal;