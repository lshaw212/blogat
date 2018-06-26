import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import AuthForm from "../components/AuthForm";

const Main = props => {
  const { currentUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route exact path="/signin" render={props => {
          return(
            <AuthForm
              onAuth={authUser}
              {...props}
            />
          );
        }}/>
        <Route exact path="/signup" render={props => {
          return(
            <AuthForm
              onAuth={authUser}
              signUp
              {...props}
            />
          );
        }}/>
      </Switch>
    </div>
  );
}

function mapStateToProps(state){
  return{
    currentUser: state.currentUser,
    errors: state.errors
  };
}

//export default withRouter(connect(mapStateToProps, { authUser})(Main));
export default Main;