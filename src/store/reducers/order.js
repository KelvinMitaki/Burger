import * as actionsTypes from "../actions/actionsTypes";
const INITIAL_STATE = {
  orders: [],
  loading: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.PURCHASE_BURGER_START:
      return { ...state, loading: true };
    // case actionsTypes.PURCHASE_BURGER_SUCCESS:
    //   const newOrder = {
    //     ...action.orderData,
    //     id: action.orderId
    //   };
    //   return {
    //     ...state,
    //     orders: state.orders.concat(newOrder),
    //     loading: false
    //   };
    case actionsTypes.FETCH_ALL_BURGERS:
      const arr = [];
      Object.keys(action.orderData).map(key => {
        return arr.push({ ...action.orderData[key], id: key });
      });
      return { ...state, orders: arr, loading: false };
    case actionsTypes.PURCHASE_BURGER_FAIL:
      return { ...state, loading: false };
    case actionsTypes.DELETE_BURGER:
      const filteredOrders = [...state.orders].filter(
        item => item.id !== action.payload
      );
      return { ...state, orders: filteredOrders };
    default:
      return state;
  }
};
