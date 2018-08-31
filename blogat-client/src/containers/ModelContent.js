import React from "react";
import ReactDOM from "react-dom";
import FocusTrap from "focus-trap-react";
import EditBlogForm from "../containers/EditBlogForm";
import EditPostForm from "../containers/EditPostForm";
import PostForm from "../containers/PostForm";

const ModalContent = ({
  ariaLabel,
  buttonRef,
  content,
  modalRef,
  onClose,
  onClickAway,
  onFocus,
  editPost,
  newPost,
  editBlog,
  postId,
  blogId,
  role = 'dialog'
}) => {
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
          </div>
        </div>
      </FocusTrap>,
      document.body
  );
}

export default ModalContent;