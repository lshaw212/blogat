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

  componentDidMount(){
    // forced removal of errors on launch (otherwise if page was reloaded with an error on screen, same error would appear on open)
    this.props.removeError(); 
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this);
    // Need to pass blog id and post id
    this.props.updatePost(this.state.title, this.state.content, this.props.blogId, this.props.postId)
      .then(() => {
        this.setState({title:"", content:""});
        this.props.onClose();
      })
      .catch(() => {
        return;
      })
      
  }

  render(){

    const { history, errors, removeError } = this.props;

    return(
      <div className="container">
        <h1>Edit Post Form</h1>
        <form onSubmit={this.handleSubmit}>
        {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
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
    errors: state.errors
  };
}

export default connect(mapStateToProps, { updatePost })(EditPostForm);