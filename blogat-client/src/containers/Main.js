import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import AuthForm from "../components/AuthForm";
import withAuth from "../hocs/withAuth";
import Homepage from "../components/Homepage";

const Main = props => {
  const { currentUser, authUser, errors, removeError } = props;
  return (
    <div className="">
      <Switch>
        <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props}/>}/>
        <Route exact path="/signin" render={props => {
          return(
            <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
              {...props}
            />
          );
        }}/>
        <Route exact path="/signup" render={props => {
          return(
            <AuthForm
              removeError={removeError}
              errors={errors}
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

export default withRouter(connect(mapStateToProps, { authUser, removeError})(Main));