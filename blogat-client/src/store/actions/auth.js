import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setAuthorizationToken(token){
  setTokenHeader(token);
}

export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function authUser(type, userData){
  console.log("Here1");
  return dispatch => {
    console.log("Here2");
    // wrap a thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({token, ...user}) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve(); // indication that the API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}