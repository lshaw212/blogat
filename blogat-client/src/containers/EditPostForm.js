import React, { Component } from "react";
import { connect } from "react-redux";
import { updatePost } from "../store/actions/posts";

class EditPostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:"",
      content:""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    // Need to pass blog id and post id
    this.props.updatePost(this.state.title, this.state.content, this.props.history.location.state.blogId, this.props.match.params.postId)
      .then(() => {
        this.setState({title:"", content:""});
      })
      .then(() => {
        this.props.history.push(`/blogs/${this.props.history.location.state.blogId}`);
      });
      
  }

  render(){
    return(
      <div className="container">
        <h1>Edit Post Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.title}
            onChange={e => this.setState({title: e.target.value})}
          />
          <label htmlFor="content">Content:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.content}
            onChange={e => this.setState({content: e.target.value})}
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

export default connect(mapStateToProps, { updatePost })(EditPostForm);