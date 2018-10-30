import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";
import EditBlogForm from "../containers/EditBlogForm";
import EditPostForm from "../containers/EditPostForm";
import EditProfileForm from "../containers/EditProfileForm";
import PostForm from "../containers/PostForm";
import AuthForm from "../components/AuthForm";
import withRouter from "react-router-dom/withRouter";

const ModalContent = props => {
  //const { currentUser, authUser, errors, removeError } = props;
  const {mProps, buttonRef, modalRef, onClose, onClickAway, onFocus,
        postId, errors, authUser, removeError, blogId
      } = props;
  const role = 'dialog';
  return ReactDOM.createPortal(
      <FocusTrap
        tag="aside"
        aria-modal="true"
        aria-label={mProps.ariaLabel}
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
            {mProps.editPost && (
              <EditPostForm
                postId={postId}
                blogId={blogId}
                title={mProps.title}
                content={mProps.content}
                removeError={removeError}
                errors={errors}
                onClose={onClose}
              />
            )}
            {mProps.newPost && (
              <PostForm
                blogId={blogId}
                onClose={onClose}
                removeError={removeError}
                errors={errors}
              />
            )}
            {mProps.editBlog && (
              <EditBlogForm
                blogId={blogId}
                onClose={onClose}
                blogName={mProps.blogName}
                blogDescription={mProps.blogDescription}
                blogImage={mProps.blogImage}
                removeError={removeError}
                errors={errors}
                {...props}
              />
            )}
            {mProps.editProfile && (
              <EditProfileForm
              
              />
            )}
            {mProps==="signin" && (
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
            {mProps==="signup" && (
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

export default withRouter(ModalContent);