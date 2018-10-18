import React, { Component } from "react";
import { apiCall } from "../services/api";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state={
      user:{}
    }
  }
  componentDidMount(){
    this.loadUser();
  }

  async loadUser(){
    let id = "5bbd1d233510573ea458e6fc";
    let user = await apiCall("get", `/api/auth/user/${id}`)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err)
    });
    this.setState({user});
    console.log(user);
  }

  render(){
    return(
      <div className="container">
        <div className="profile-layout">
          <div className="profile-information">
            <p>test</p>
          </div>
          <div className="profile-blogs">
            <p>test2</p>
          </div>
        </div>
      </div>
    )
  }

}

export default Profile;