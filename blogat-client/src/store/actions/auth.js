import { apiCall, setTokenHeader } from "../../services/api";

export function setAuthorizationToken(token){
  setTokenHeader(token);
}

export function setCurrentUser(user){
  return user;
}

export function authUser(type, userData){
  //return dispatch => {
    // wrap a thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({token, ...user}) => {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          //dispatch(setCurrentUser(user));
          resolve(); // indication that the API call succeeded
        })
        .catch(err => {
          //dispatch(addError(err.message));
          reject();
        });
    });
  //};
}