import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import classes from "./index.module.css";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import React, { Component } from "react";
import { checkAuthViaLocalStorage } from "./store/actions/auth";
import { connect } from "react-redux";
export class App extends Component {
  componentDidMount() {
    this.props.checkAuthViaLocalStorage();
  }
  render() {
    return (
      <BrowserRouter>
        <div className={classes.body}>
          <Layout>
            <Route path="/checkout" component={Checkout} />
            <Route
              path="/orders/:id"
              render={() => {
                return (
                  <div>
                    <h3 style={{ textAlign: "center" }}>
                      You Can Cancel Your Order By Clicking On It
                    </h3>
                    <Orders />
                  </div>
                );
              }}
            />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { checkAuthViaLocalStorage })(App);
