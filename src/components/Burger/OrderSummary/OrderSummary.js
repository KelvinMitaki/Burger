import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following ingredients: </p>
      <ul>{props.orederItems}</ul>
      <p>
        Total Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      <Button btnType="Danger" clicked={props.onBackDropClick}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.onContinueBtnSuccess}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
