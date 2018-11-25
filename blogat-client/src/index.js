import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import Footer from "./components/Footer";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render([<App/>, <Footer />], document.getElementById('root'));
registerServiceWorker();
