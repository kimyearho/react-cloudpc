import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./views/App";

//* React 18 bootstrap
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

//* React 18 bootstrap
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
