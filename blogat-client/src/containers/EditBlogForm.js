import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBlog } from "../store/actions/blogs";

class EditBlogForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      text:"",
      desc: "",
      image:""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .updateBlog(this.state.text, this.state.desc, this.state.image, this.props.blogId)
      .then(() => {
        this.setState({text:"", desc:"", image:""});
        console.log("Yes");
        //this.props.onClose();
      })
      .catch(() => {
        console.log("No");
        return;
      });
  };

  render(){
    const { history, errors, removeError } = this.props;

    if(errors.message){
      const unListen = history.listen(() => {
        removeError();
        unListen();
      })
    }

    return(
      <div className="container">
        <h1>EDIT FORM</h1>
        <form onSubmit={this.handleSubmit}>
        {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
          <label htmlFor="text">Blog Name:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.text}
            onChange={e => this.setState({text: e.target.value})}
          />
          <label htmlFor="desc">Blog Description:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.desc}
            onChange={e => this.setState({desc: e.target.value})}
          />
          <label htmlFor="image">Blog Image Url:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.image}
            onChange={e => this.setState({image: e.target.value})}
          />
          <hr/>
          <button type="submit" className="btn btn-success pull-right">
            Save Changes
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {

  };
}

export default connect(mapStateToProps, { updateBlog })(EditBlogForm);