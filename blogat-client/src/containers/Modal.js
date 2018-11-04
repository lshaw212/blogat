import React, { Component } from "react";
import { removeError } from "../store/actions/errors";
import { authUser } from "../store/actions/auth";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import ModalContent from "../containers/ModelContent";

class Modal extends Component {
  state = { isOpen: false };

  onOpen = () => {
    console.log("do we trigger?");
    this.setState({isOpen: true}, () => {
      this.closeButtonNode.focus();
    });
    this.toggleScrollLock();
  };

  onClose = () => {
    this.setState({isOpen: false});
    this.openButtonNode.focus();
    this.toggleScrollLock();
    this.props.removeError();
  }

  onKeyDown = ({ keyCode }) => keyCode === 27 && this.onClose();
  toggleScrollLock = () => document.querySelector('html').classList.toggle('u-lock-scroll');
  // onKeyDown = (event) => {
  //   return event.keyCode === 27 && this.onClose();
  // }
  onClickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.props.removeError();
    this.onClose();
  };

  

  render(){
    const { isOpen } = this.state;
    const { errors, removeError, mProps, btnText, btnClass, role, children, postId, blogId, editPost, newPost, editBlog, signin, signup,authUser } = this.props;
    return(
      
      <div>
        
        <a className={btnClass} onClick={this.onOpen} ref={n => this.openButtonNode = n}>{btnText}</a>
        {isOpen &&
          <ModalContent
            buttonRef={n => this.closeButtonNode = n}
            modalRef={n => this.modalNode = n}
            onClickAway={this.onClickAway}
            onClose={this.onClose}
            onKeyDown={this.onKeyDown}
            postId={postId}
            blogId={blogId}
            role={role}
            authUser={authUser}
            removeError={removeError}
            errors={errors}
            mProps={mProps}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, {authUser,removeError})(Modal));