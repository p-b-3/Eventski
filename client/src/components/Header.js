import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        //if logged in
        return <li>Logout</li>;
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper teal accent-3">
          <a className="left brand-logo"> Eventski</a>
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
