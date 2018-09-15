import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewBlog } from "../store/actions/blogs";
import { removeError } from "../store/actions/errors";

class BlogForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      text:"",
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
    console.log("handleNewBlog");
    this.props
      .createNewBlog(this.state.text, this.state.desc, this.state.image)
      .then( () => {
        this.setState({text:"",desc:"",image:""})
        this.props.history.push("/");
      })
      .catch(() => {
        return;
      })
    
    //this.props.history.push("/"); // Could go straight to new blog?
  }

  render(){
    const { errors } = this.props;
    return(
      <div className="container">
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
            Create new blog
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