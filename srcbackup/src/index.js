import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
//npm install --save font-awesome
import 'font-awesome/css/font-awesome.min.css';
import './style.css';
import './import.css';

import Routes from './Routes';

import * as serviceWorker from "./serviceWorker";

const rootId = document.getElementById("root");
ReactDOM.render(<Routes />, rootId);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();