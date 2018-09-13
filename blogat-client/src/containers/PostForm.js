import React, { Component } from "react";
import { connect } from "react-redux";
import { createPost } from "../store/actions/posts";

class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:"",
      content:""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props
    .createPost(this.state.title, this.state.content, this.props.blogId)
    .then( () =>{
      this.props.onClose();
    })
    .catch(() => {
      return;
    })  
    
    // createpost
  }

  render(){

    const { history, errors, removeError } = this.props;

    return(
      <div className="container">
        <h1>New Post</h1>
        <form onSubmit={this.handleSubmit}>
        {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
          <label htmlFor="title">Post Title:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.title}
            onChange={e => this.setState({title: e.target.value})}
          />
          <label htmlFor="content">Post Contents:</label>
          <textarea
            cols="30"
            rows="10"
            className="form-control"
            value={this.state.content}
            onChange={e => this.setState({content: e.target.value})}
          />
          <hr/>
          <button type="submit" className="btn btn-success pull-right">
            Create Blog Post
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

export default connect(mapStateToProps, { createPost })(PostForm);