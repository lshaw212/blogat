import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import Navbar from "./Navbar";
import Main from "./Main";
import Footer from "../components/Footer";
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from "jwt-decode";
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/lib/integration/react';



const store = configureStore();
const persistor = persistStore(store);

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router>
        <div className="Site">
          <Navbar/>
          <Main/>
          <Footer/> 
        </div>
      </Router>
    {/* </PersistGate> */}
  </Provider>
);

export default App;