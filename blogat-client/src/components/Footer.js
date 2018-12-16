import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => (
  <footer id="footer">
    <div id="footer-flex">
      <div id="footer-copyright">© 2018-2019 Lewis Shaw. All rights reserved.</div>
      <Link to="/aboutme">
        <div>About</div>
      </Link>
    </div>
  </footer>
)

export default Footer;