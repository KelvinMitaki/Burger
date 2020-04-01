import * as actionsTypes from "./actionsTypes";
import axios from "axios";
export const addIngredient = name => {
  return {
    type: actionsTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionsTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const fetchIngredients = () => {
  return dispatch => {
    axios
      .get("https://burger-b0143.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch({
          type: actionsTypes.FETCH_INGREDIENTS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({ type: actionsTypes.FETCH_INGREDIENTS_FAILED });
      });
  };
};
