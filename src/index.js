import React from "react";
import ReactDOM from "react-dom";
import "./services/serviceHelper";
// import "bootstrap/dist/css/bootstrap.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.Fragment>
    <App></App>
    <Toaster position="top-right" />
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
