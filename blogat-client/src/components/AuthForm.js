import React, { Component } from "react";


export default class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      username:"",
      passsword:"",
      profileImageUrl:""
    };
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
      .onAuth(authType, this.state)
      .then(() => {
        //this.props.history.push("/");
        console.log("yes");
      }).catch(() =>{
        console.log("No");
        return;
      });
  };

  render(){
    const { email, username, profileImageUrl } =this.state;
    const { buttonText, heading, signUp, errors, history, removeError } = this.props;
    // This if statement not working as intended, removeError is called inside Modal
    if(errors.message){
      const unListen = history.listen(() => {
        removeError();
        unListen();
      })
    }

    return(
      <div className="container">
        <div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && (<div className="alert alert-danger">{errors.message}</div>)}
              <label htmlFor="email">Email:</label>
              <input type="text" className="form-control" id="email" name="email" onChange={this.handleChange} value={email}/>
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange}/>
              {signUp && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input type="text" className="form-control" id="username" name="username" onChange={this.handleChange} value={username}/>
                </div>
              )}
              <hr/>
              <button className="btn btn-primary btn-block btn-lg">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}