import React, { Component } from "react";
import { authUser } from "../store/actions/auth";
import { connect } from "react-redux";
import { removeError } from "../store/actions/errors";
import { fetchFavorites } from "../store/actions/auth";
import { withRouter } from "react-router-dom";
import { Button } from 'react-bootstrap';


class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      username:"",
      passsword:"",
      profileImageUrl:"https://i.imgur.com/Mc3lrXL.jpg",
      'social.twitter': "",
      'social.linkedin': "",
      'social.github': "",
      bio: ""
      
    };
  }
  
  componentDidMount(){
    // forced removal of errors on launch (otherwise if page was reloaded with an error on screen, same error would appear on open)
    this.props.removeError(); 
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin"
    //const authType = "signin";
    this.props
      .authUser(authType, this.state)
      .then(() => {
        if(authType == "signin")
          this.props.fetchFavorites();
        //this.props.history.push("/");
        console.log("fix this area");
      }).catch(() =>{
        console.log("No");
        return;
      });
  };

  skip = e => {
    console.log("skip here");
  }

  render(){
    const { email, username } =this.state;
    const { buttonText, heading, login, signUp, errors, history, removeError, handleClose, register } = this.props;
    // This if statement not working as intended, removeError is called inside Modal
    if(errors.message){
      const unListen = history.listen(() => {
        removeError();
        unListen();
      })
    }

    return(
      <div>
        <div className="form-modal">
          <div id="auth-form-header">{heading}</div>
          <form onSubmit={this.handleSubmit}>
            {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
            {signUp && (
              <div className="form-group">
                <input type="text" className="form-control auth-form-input" id="username" name="username" onChange={this.handleChange} value={username} placeholder="Username"/>
              </div>
            )}
            <div className="form-group">
              <input type="text" className="form-control auth-form-input" id="email" name="email" onChange={this.handleChange} value={email} placeholder="Email Address"/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control auth-form-input" id="password" name="password" onChange={this.handleChange} placeholder="Password"/>
            </div>
            <hr/>
            <button className="btn btn-primary btn-block btn-lg form-button">
              {buttonText}
            </button>
          </form>
        </div>
        {login && (
          <div className="auth-form-register">
            <div>First time here?</div>
            <div className="auth-form-signup-text" onClick={register}> Sign up!</div>
          </div>
        )}
        {signUp && (
          <div className="auth-form-register">
            <div>Just want to see the app?</div>
            <div className="auth-form-signup-text" onClick={this.skip.bind(this)}>Skip here</div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    favorites: state.currentUser.favorites || [],
    errors: state.errors
  };
}

export default withRouter(connect(mapStateToProps, {authUser, fetchFavorites, removeError})(AuthForm));