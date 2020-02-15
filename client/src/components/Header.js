import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripeBilling from "./StripeBilling";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false: //false is returned from authReducer which is set as auth in reducers/index.js
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        //if logged in
        return [
          <li key="1">
            <StripeBilling />
          </li>,
          <li key="2" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper teal accent-3">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Eventski
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  //gets called with entire state object from redux store
  //return to object to Header as props, so only care about auth part
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
