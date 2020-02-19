import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Landing from "./Landing";
import { connect } from "react-redux";
import * as actions from "../actions";

import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
  //connect App to redux store using react-redux connect helper to give App access to call actions creators
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div classname="container">
            <Header />
            <Route exact={true} path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App); //first arg is mapstatetoprops function, second is all action creators- actions are assigned as props in App
