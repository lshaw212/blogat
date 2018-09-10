import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";
import { connect } from "react-redux";
import EditBlogForm from "../containers/EditBlogForm";
import EditPostForm from "../containers/EditPostForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import PostForm from "../containers/PostForm";
import AuthForm from "../components/AuthForm";
import withRouter from "react-router-dom/withRouter";

const ModalContent = props => {
  //const { currentUser, authUser, errors, removeError } = props;
  const {ariaLabel, buttonRef, content, modalRef, onClose, onClickAway, onFocus, editPost,
        newPost, editBlog, signin, signup, postId, errors, authUser, removeError, blogId
      } = props;
  const role = 'dialog';

  return ReactDOM.createPortal(
      <FocusTrap
        tag="aside"
        aria-modal="true"
        aria-label={ariaLabel}
        role={role}
        tabIndex="-1"
        onFocus={onFocus}
        className="c-modal-cover"
        onClick={onClickAway}
      >
        
        <div className="c-modal" ref={modalRef}>
          <button className="c-modal__close" aria-labelledby="close-modal" onClick={onClose} ref={buttonRef}>
            <span id="close-modal" className="u-hide-visually">Close</span>
            <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
          </button>
          <div className="c-modal__body">
            {editPost && (
              <EditPostForm postId={postId} blogId={blogId} onClose={onClose} />
            )}
            {newPost && (
              <PostForm blogId={blogId} onClose={onClose} />
            )}
            {editBlog && (
              <EditBlogForm blogId={blogId} onClose={onClose} />
            )}
            {signin && (
              <AuthForm
                onClose={onClose}
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText="Log in"
                heading="Please log in to continue"
                {...props}
              />
            )}
            {signup && (
              <AuthForm
                onClose={onClose}
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText="Sign me up!"
                heading="Join Blog@ today!"
                signUp
                {...props}
              />
            )}
          </div>
        </div>
      </FocusTrap>,
      document.body
  );
}

function mapStateToProps(state){
  return{
    currentUser: state.currentUser,
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, { authUser, removeError})(ModalContent));