import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navigate from "./Navigate";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Navigate />
    </React.StrictMode>
  </Provider>
);
