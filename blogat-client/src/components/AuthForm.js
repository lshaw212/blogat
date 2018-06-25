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
    this.props
      //.onAuth(authType, this.state)
      .then(() => {
        this.props.history.push("/");
      }).catch(() => {
        return;
      });
  }

  render(){
    const { email, username, password, profileImageUrl } =this.state;
    const { buttonText, heading, signUp, errors, history, removeError } = this.props;
    return(
      <div>
        <div className="row justify-content-md-center textcenter">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>Ayyyy form and shit</h2>
              <label htmlFor="email">Email:</label>
              <input type="text" className="form-control" id="email" name="email" onChange={this.handleChange} value={email}/>
              <label htmlFor="password">Password:</label>
              <input type="password" className="form-control" id="password" name="password" onChange={this.handleChange}/>
              <label htmlFor="username">Username:</label>
              <input type="text" className="form-control" id="username" name="username" onChange={this.handleChange} value={username}/>
              <button className="btn btn-primary btn-block btn-lg">
                Submit!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}