import React, { Component } from "react";
import { connect } from "react-redux";
import { removeError } from "../store/actions/errors";
import { updateBlog } from "../store/actions/blogs";
import { Button } from "react-bootstrap";

class EditBlogForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      name:this.props.blogName,
      desc: this.props.blogDescription,
      image:this.props.blogImage
    };
  }

  componentDidMount(){
    // forced removal of errors on launch (otherwise if page was reloaded with an error on screen, same error would appear on open)
    this.props.removeError(); 
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .updateBlog(this.state.name, this.state.desc, this.state.image, this.props.blogId)
      .then(() => {
        this.setState({text:"", desc:"", image:""});
        console.log("Yes");
        this.props.onClose();
      })
      .catch(() => {
        console.log("No");
        return;
      });
  };

  render(){
    const { history, errors, removeError, handleClose } = this.props;

    if(errors.message){
      const unListen = history.listen(() => {
        removeError();
        unListen();
      })
    }

    return(
      <div className="form-modal">
        <div className="form-header">Edit Blog</div>
        <hr/>
        <form onSubmit={this.handleSubmit}>
        {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
          <div className="input-section">
            <div className="input-section-text">
              <label className="input-section-text-title" htmlFor="name">Name</label>
              <div className="input-section-text-extra">Create a blog about anything! but make sure the name is relevant</div>
            </div>
            <div className="input-section-input">
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value})}
              />
            </div>
          </div>
          <hr/>
          <div className="input-section">
            <div className="input-section-text">
              <label className="input-section-text-title" htmlFor="image">Image Url</label>
              <div className="input-section-text-extra">Use imgur.com for hosting your blog image. Leave input blank for the default background.</div>
            </div>
            <div className="input-section-input">
              <input
                type="text"
                className="form-control"
                value={this.state.image}
                onChange={e => this.setState({image: e.target.value})}
              />
            </div>
          </div>
          <hr/>
          <div className="input-section">
            <div className="input-section-text">
              <label className="input-section-text-title" htmlFor="desc">Description</label>
              <div className="input-section-text-extra">Describe best your blog and what users should expect from your continued blog posts.</div>
            </div>
            <div className="input-section-input">
              <textarea
                cols="30"
                rows="5"
                type="text"
                className="form-control"
                value={this.state.desc}
                onChange={e => this.setState({desc: e.target.value})}
              />
            </div>
          </div>
          <hr/>
          <div>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn btn-success">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { updateBlog, removeError })(EditBlogForm);