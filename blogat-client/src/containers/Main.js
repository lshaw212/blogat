import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Main = props => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/signin" render={props => {
          return(
            <AuthForm
              {...props}
            />
          );
        }}/>
        <Route exact path="/signup" render={props => {
          return(
            <AuthForm
              {...props}
            />
          );
        }}/>
      </Switch>
    </div>
  );
}

export default Main;