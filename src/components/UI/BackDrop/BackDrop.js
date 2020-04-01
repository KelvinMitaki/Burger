import React from "react";
import classes from "./BackDrop.module.css";
const BackDrop = props => {
  return props.show ? (
    <div onClick={props.onBackDropClick} className={classes.BackDrop}></div>
  ) : null;
};

export default BackDrop;
