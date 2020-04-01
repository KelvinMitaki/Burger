import React from "react";
import classes from "./Input.module.css";
const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.inValid && props.checkValid && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );

      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          onChange={props.changed}
          value={props.value}
        >
          {" "}
          {props.elementConfig.options.map(element => {
            return (
              <option key={element.value} value={element.value}>
                {element.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
