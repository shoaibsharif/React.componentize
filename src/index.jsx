import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <React.Fragment>
    <App></App>
    <Toaster position="top-right" />
  </React.Fragment>,
  document.getElementById("root")
);
