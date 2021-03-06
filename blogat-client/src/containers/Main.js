import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import AuthForm from "./forms/AuthForm";
import Homepage from "../containers/Homepage";
import Blog from "../containers/Blog";
import Profile from "../containers/Profile";
import BlogForm from "./forms/BlogForm";
import BlogList from "./BlogList";
import AboutMe from "../components/AboutMe";

const Main = props => {
  const { currentUser, authUser, errors, removeError, location } = props;
  return (
    <div className="Site-content">
      <section className="route-section">
        <Switch location={location}>
          <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props}/>}/>
          <Route exact path="/blogs" component={BlogList} />
          <Route exact path="/signin" render={props => {
            return(
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText="Log in"
                heading="Please log in to continue"
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
                buttonText="Sign me up!"
                heading="Join Blog@ today!"
                signUp
                {...props}
              />
            );
          }}/>
          <Route path="/users/:userId/blog/new" component={(BlogForm)}/>
          <Route path="/blog/:id" component={(Blog)}/>
          <Route path="/user/:id" component={(Profile)}/>
          <Route path="/aboutme" component={(AboutMe)}/>
        </Switch>
      </section>
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