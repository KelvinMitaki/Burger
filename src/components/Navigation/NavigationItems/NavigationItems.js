import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";
import { onLogOutClick } from "../../../store/actions/auth";
import Aux from "../../../hoc/Auxiliary";

const NavigationItems = props => {
  const onLogOutClickAction = () => {
    props.onLogOutClick();
  };
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.idToken ? (
        <Aux>
          <NavigationItem link={`/orders/${props.localId}`}>
            Orders
          </NavigationItem>
          <NavigationItem click={onLogOutClickAction} link="/auth">
            LogOut
          </NavigationItem>
        </Aux>
      ) : (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      )}
    </ul>
  );
};
const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken,
    localId: state.auth.localId
  };
};
export default connect(mapStateToProps, { onLogOutClick })(NavigationItems);
