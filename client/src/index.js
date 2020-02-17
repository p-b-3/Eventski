// data layer (redux)
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDom from "react-dom"; //takes root component and where we are looking to render that in the dom
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/App.js";
import reducers from "./reducers/index.js";
import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); //pass in reducers, initial state of app

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, //place App component as child component to Provider component, which can read changes in redux store
  document.querySelector("#root")
); //select div with id 'root' from index.html
