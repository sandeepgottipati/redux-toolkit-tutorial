import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
