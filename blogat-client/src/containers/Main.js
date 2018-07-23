import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import AuthForm from "../components/AuthForm";
import withAuth from "../hocs/withAuth";
import Homepage from "../components/Homepage";
import Blog from "../components/Blog";
import BlogForm from "../containers/BlogForm";
import PostForm from "../containers/PostForm";
import BlogList from "../containers/BlogList";

const Main = props => {
  const { currentUser, authUser, errors, removeError } = props;
  return (
    <div className="">
      <Switch>
        <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props}/>}/>
        <Route path="/blogs" component={BlogList} />
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
        <Route path="/blog/:blogId/newpost" component={(PostForm)}/>
        
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