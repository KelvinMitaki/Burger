import classes from "./Order.module.css";
import React, { Component } from "react";

export class Order extends Component {
  render() {
    if (this.props.ingredients) {
      const res = Object.keys(this.props.ingredients).map(item => {
        return (
          <span
            key={item}
            style={{
              textTransform: "capitalize",
              display: "inline-block",
              margin: "0 8px",
              border: "1px solid #ccc",
              padding: "5px"
            }}
          >
            {item} {`(${this.props.ingredients[item]})`}
          </span>
        );
      });
      return (
        <div className={classes.Order}>
          Ingredients: {res}
          <p>
            Price{" "}
            <strong>USD {Math.round(this.props.price * 100) / 100}</strong>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Order;
