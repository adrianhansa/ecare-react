import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.withCredentials = true;
ReactDOM.render(<App />, document.getElementById("root"));
