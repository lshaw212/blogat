import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <h4>Ayyyy</h4>
      <Main />
    </div>
  </Router>
  
);

export default App;