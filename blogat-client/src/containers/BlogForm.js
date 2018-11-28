import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewBlog } from "../store/actions/blogs";
import { removeError } from "../store/actions/errors";
import { FormGroup, FormControl } from "react-bootstrap";

class BlogForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:"",
      desc:"",
      image:""
    };
  }

  componentDidMount(){
    // forced removal of errors on launch (otherwise if page was reloaded with an error on screen, same error would appear on open)
    this.props.removeError(); 
  }

  handleSubmit = e => {
    e.preventDefault();
    // this.props post new blog stuff
    this.props
      .createNewBlog(this.state.name, this.state.desc, this.state.image)
      .then( () => {
        this.setState({name:"",desc:"",image:""})
        this.props.history.push("/");
      })
      .catch(() => {
        return;
      })
    
    //this.props.history.push("/"); // Could go straight to new blog?
  }
  getValidationNameState() {
    const length = this.state.name.length;
    if (length > 100) return 'error';
    return null;
  }
  getValidationDescState() {
    const length = this.state.desc.length;
    if (length > 200) return 'error';
    return null;
  }

  render(){
    const { errors } = this.props;
    return(
      <div className="container">
      <div className="form-header">Create New Blog</div>
        <hr/>
        <form onSubmit={this.handleSubmit}>
        {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
          <div className="input-section">
            <div className="input-section-text">
              <label className="input-section-text-title" htmlFor="name">Name</label>
              <div className="input-section-text-extra">Create a blog about anything! but make sure the name is relevant</div>
            </div>
            <div className="input-section-input">
              <FormGroup validationState={this.getValidationNameState()}>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={e => this.setState({name: e.target.value})}
                />
                <FormControl.Feedback/>
              </FormGroup>
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
              <FormGroup validationState={this.getValidationDescState()}>
                <textarea
                  cols="30"
                  rows="5"
                  type="text"
                  className="form-control"
                  value={this.state.desc}
                  onChange={e => this.setState({desc: e.target.value})}
                />
                <FormControl.Feedback />
              </FormGroup>
            </div>
          </div>
          <hr/>
          <button className="form-submit" type="submit" className="btn btn-success pull-right">
            Submit
          </button>
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

export default connect(mapStateToProps, { createNewBlog, removeError })(BlogForm);