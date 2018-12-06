import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import AuthForm from "../components/AuthForm";
import withAuth from "../hocs/withAuth";
import Homepage from "../components/Homepage";
import Blog from "../components/Blog";
import Profile from "../components/Profile";
import BlogForm from "./BlogForm";
import BlogList from "./BlogList";
import Navbar from "./Navbar";
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import AboutMe from "../components/AboutMe";

const Main = props => {
  const { currentUser, authUser, errors, removeError, location } = props;
  const timeout = { enter: 300, exit: 200 }
  return (
    <div className="transition-group Site-content">
    <TransitionGroup className="transition-group">
    <CSSTransition
      key={location.key}
      timeout={timeout}
      classNames="fade"
      appear
      >
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
          <Route path="/blogs/:id" component={(Blog)}/>
          <Route path="/user/:id" component={(Profile)}/>
          <Route path="/aboutme" component={(AboutMe)}/>
        </Switch>
        </section>
      </CSSTransition>
      </TransitionGroup>
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