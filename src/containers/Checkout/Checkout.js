import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

class Checkout extends Component {
  // componentDidMount() {

  //   // const query = new URLSearchParams(this.props.location.search);
  //   // const ingredients = {};
  //   // let price;
  //   // for (let param of query.entries()) {
  //   //   if (param[0] === "price") {
  //   //     price = param[1];
  //   //   } else {
  //   //     ingredients[param[0]] = parseInt(param[1]);
  //   //   }
  //   // }
  //   // this.setState({ ingredients: ingredients, totalPrice: price });
  // }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ingredients} />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
  };
};
export default connect(mapStateToProps)(Checkout);
