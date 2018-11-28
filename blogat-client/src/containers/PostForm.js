import React, { Component } from "react";
import { connect } from "react-redux";
import { removeError } from "../store/actions/errors";
import { createPost } from "../store/actions/posts";
import { Button, FormControl, FormGroup } from "react-bootstrap";

class PostForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:"",
      image:"",
      content:"",
      layout: 1
    };
  }

  componentDidMount(){
    // forced removal of errors on launch (otherwise if page was reloaded with an error on screen, same error would appear on open)
    this.props.removeError(); 
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.imageChecker(this.state.image);
    await this.props
      .createPost(this.state.title, this.state.content, this.state.image, this.state.layout, this.props.blogId)
      .then( () =>{
        this.props.handleClose();
      })
      .catch(() => {
        return;
      });
    
    // createpost
  }
  
  imageChecker(str){
    if(!str.includes('i.imgur.com')){
      this.setState({image: ''});
      this.setState({layout:1});
    } 
  }

  handleRadioButton(val){
    this.setState({
      layout: val
    });
  }
  getValidationTitleState() {
    const length = this.state.title.length;
    if (length > 100) return 'error';
    return null;
  }

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
        <div className="form-header">Create Post</div>
        <hr/>
        <form onSubmit={this.handleSubmit}>
        {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
          <div className="input-section">
            <div className="input-section-text">
              <label className="input-section-text-title" htmlFor="title">Title</label>
              <div className="input-section-text-extra">Create a short name for your blog post.</div>
            </div>
            <div className="input-section-input">
              <FormGroup validationState={this.getValidationTitleState()}>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.title}
                  onChange={e => this.setState({title: e.target.value})}
                />
                <FormControl.Feedback/>
              </FormGroup>
            </div>
          </div>
          <hr/>
          <div className="input-section">
            <div className="input-section-text">
              <label className="input-section-text-title" htmlFor="image">Post Image and Layout</label>
              <div className="input-section-text-extra">Use imgur.com to use an image and select your layout type</div>
            </div>
            <div className="input-section-input">
              <div>
                <div className="social-size">Image Url</div>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.image}
                  onChange={e => this.setState({image: e.target.value})}
                />
              </div>
              <div className="social-size">Select your layout</div>
              <div className="input-section-radiobuttons">
                <div>
                  <div className="layout-images" style={{backgroundImage: `url(${require("../images/layout1.jpg")})`}}></div>
                  <input type="radio" checked={this.state.layout === 1} onChange={() => this.handleRadioButton(1)}/>
                </div>
                <div>
                  <div className="layout-images" style={{backgroundImage: `url(${require("../images/layout2.jpg")})`}}></div>
                  <input type="radio" checked={this.state.layout === 2} onChange={() => this.handleRadioButton(2)}/>
                </div>
                <div>
                  <div className="layout-images" style={{backgroundImage: `url(${require("../images/layout3.jpg")})`}}></div>
                  <input type="radio" checked={this.state.layout === 3} onChange={() => this.handleRadioButton(3)}/>
                </div>
                <div>
                  <div className="layout-images" style={{backgroundImage: `url(${require("../images/layout4.jpg")})`}}></div>
                  <input type="radio" checked={this.state.layout === 4} onChange={() => this.handleRadioButton(4)}/>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          <div className="input-section">
            <div className="input-section-text">
              <label className="input-section-text-title" htmlFor="content">Content</label>
              <div className="input-section-text-extra">Write up your blog post and keep it as detailed and interesting as possible, you will have the ability to edit this post later on.</div>
            </div>
            <div className="input-section-input">
              <textarea
                cols="30"
                rows="10"
                className="form-control"
                value={this.state.content}
                onChange={e => this.setState({content: e.target.value})}
              />
            </div>
          </div>
          <hr/>
          <div className="input-buttons">
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn btn-success">
              Create Blog Post
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

export default connect(mapStateToProps, { createPost, removeError })(PostForm);