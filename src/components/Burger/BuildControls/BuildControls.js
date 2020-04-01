import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];
const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            addIngredientHandler={() => props.addIngredientHandler(ctrl.type)}
            removeIngredientHandler={() =>
              props.removeIngredientHandler(ctrl.type)
            }
            disabledInfo={props.disabledInfo[ctrl.type]}
          />
        );
      })}
      {props.idToken ? (
        <button
          onClick={props.onModalButtonClick}
          disabled={props.purchaseBtn}
          className={classes.OrderButton}
        >
          ORDER NOW
        </button>
      ) : (
        <button
          onClick={() => props.history.push("/auth")}
          className={classes.OrderButton}
        >
          CLICK TO SIGN UP/SIGN IN
        </button>
      )}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken
  };
};
export default connect(mapStateToProps)(withRouter(BuildControls));
