import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";
const Burger = props => {
  if (props.ingredients) {
    let transfromedIngredient = Object.keys(props.ingredients)
      .map(ingredient => {
        return [...Array(props.ingredients[ingredient])].map((_, index) => {
          return (
            <BurgerIngredient key={ingredient + index} type={ingredient} />
          );
        });
      })
      .reduce((initialArr, currArray) => {
        return initialArr.concat(currArray);
      }, []);
    if (transfromedIngredient.length === 0) {
      transfromedIngredient = <p>Please start adding ingredients</p>;
    }

    return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transfromedIngredient}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
  } else {
    return null;
  }
};

export default Burger;
