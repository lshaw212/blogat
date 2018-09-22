import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Modal from "../containers/Modal";

const signinProps = {
  ariaLabel: 'A label describing the Modal\'s current content',
  signin: true
}
const signUpProps = {
  ariaLabel: 'A label describing the Modal\'s current content',
  signup: true
}

const landingPageData = [
  {
    text: "Test1"
  }, {
    text: "Test2"
  }, {
    text: "Test3"
  }
];

class Homepage extends Component {
  constructor(props){
    super(props);
    this.state={
      timerText: 0,
      spanText: "Test Text 0"
    }
    
  }
  
  componentDidMount(){
    //this.test();
    console.log(landingPageData[1].text);
  }

  // test(){
  //   //console.log("BOOOOO YAAAAA TEST LOL");
  //   setInterval(function(){
  //     console.log("1");
  //     // this.setState({})
  //     if(this.state.timerText=="1"){
  //       this.setState({spanText:"Test Text 1"});
  //     }
  //     else if(this.state.timerText=="2")
  //     this.setState({spanText:"Test Text 2"});
  //     else if(this.state.timerText=="3")
  //     this.setState({spanText:"Test Text 3"});
  //     else if(this.state.timerText=="4"){
  //       this.setState({spanText:"Test Text 4",timerText:0});
  //     }
  //   }, 5000);
  // }

  
  
  render(){
    const { currentUser } = this.props;
    if(!currentUser.isAuthenticated){
      return(
        <div className="homepageTest">
          <ul className="backgroundLoop">
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
          </ul>
          <div className="home-hero">
            <p id="titleText">Blog<strong>@</strong></p>
            <p className="descText">Welcome to Blog@, where you can create and share blogs with everyone.</p>
            <p className="descText">Create your first blog now about 
              <div className="slidingVertical">
                <span>Adventure</span>
                <span>reading</span>
                <span>computing</span>
                <span>animals</span>
                <span>sports</span>
                <span>cooking</span>
              </div>
            </p>
            <Modal mProps={signinProps} triggerText='Log In' />
            <Modal mProps={signUpProps} triggerText='Sign Up' />
          </div>
        </div>
      )
    }
    return (
      <div>
        {/* Redirect if logged in to BlogList */}
        <Redirect to="/blogs" />
        {/* <BlogList/> */}
      </div>
    )
  }
}

export default Homepage;