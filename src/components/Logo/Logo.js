import React from "react";
import classes from "./Logo.module.css";
import BurgerLogo from "../../assets/images/burger-logo.png";
const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={BurgerLogo} alt="Burger" />
    </div>
  );
};

export default Logo;
