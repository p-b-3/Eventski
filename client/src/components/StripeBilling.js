import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class StripeBilling extends Component {
  render() {
    return (
      <StripeCheckout
        name="Eventski"
        description="Purchase credits"
        amount={500} //US cents
        token={token => this.props.handleToken(token)} //callback function to be called once we've retrieved an authorization token from Stripe API
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn deep-purple accent-1">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(StripeBilling);
