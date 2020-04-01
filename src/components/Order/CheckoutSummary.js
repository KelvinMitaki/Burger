import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";
export class CheckoutSummary extends Component {
  render() {
    const { salad, bacon, cheese, meat } = this.props;
    const test2 = salad || bacon || cheese || meat;
    if (test2) {
      return (
        <div className={classes.CheckoutSummary}>
          <h1>We hope it tastes well</h1>
          <div style={{ width: "300px", margin: "auto" }}>
            <Burger ingredients={this.props.ingredients} />
          </div>
          <Button clicked={() => this.props.history.push("/")} btnType="Danger">
            CANCEL
          </Button>
          <Button
            clicked={() => this.props.history.push("/checkout/contact-data")}
            btnType="Success"
          >
            CONTINUE
          </Button>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  if (state.burgerBuilder.ingredients) {
    return {
      salad: state.burgerBuilder.ingredients.salad,
      bacon: state.burgerBuilder.ingredients.bacon,
      cheese: state.burgerBuilder.ingredients.cheese,
      meat: state.burgerBuilder.ingredients.meat
    };
  } else {
    return {};
  }
};
export default connect(mapStateToProps)(withRouter(CheckoutSummary));
