import instance from "../../axios-orders";
import * as actionsTypes from "./actionsTypes";
export const purchaseBurger = (orderData, idToken, history) => {
  return (dispatch, getState) => {
    dispatch({ type: actionsTypes.PURCHASE_BURGER_START });

    instance
      .post(
        `/orders/${getState().auth.localId}.json?auth=${idToken}`,
        orderData
      )
      .then(response => {
        dispatch({
          type: actionsTypes.PURCHASE_BURGER_SUCCESS,
          orderData: orderData,
          orderId: response.data.name
        });
        history.push(`/orders/${getState().auth.localId}`);
      })
      .catch(error => {
        dispatch({ type: actionsTypes.PURCHASE_BURGER_FAIL, error: error });
      });
  };
};

export const fetchAllBurgers = idToken => {
  return (dispatch, getState) => {
    instance
      .get(`/orders/${getState().auth.localId}.json?auth=${idToken}`)
      .then(response => {
        dispatch({
          type: actionsTypes.FETCH_ALL_BURGERS,
          orderData: response.data
        });
      })
      .catch(err => console.log(err));
  };
};

export const deleteBurger = (id, idToken) => {
  return dispatch => {
    instance
      .delete(`/orders/${id}.json?auth=${idToken}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
    dispatch({ type: actionsTypes.DELETE_BURGER, payload: id });
  };
};
