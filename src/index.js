import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
