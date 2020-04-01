import React, { Component } from "react";
import Order from "../../components/Order/Order";
import { connect } from "react-redux";
import { fetchAllBurgers, deleteBurger } from "../../store/actions/order";
import { Redirect } from "react-router-dom";
class Orders extends Component {
  componentDidMount() {
    this.props.fetchAllBurgers(this.props.idToken);
  }
  onDeleteOrderClick = id => {
    this.props.deleteBurger(id, this.props.idToken);
  };
  render() {
    if (this.props.idToken === null) {
      return <Redirect to="/auth" />;
    } else {
      if (this.props.orders) {
        return this.props.orders.map(item => {
          return (
            <div onClick={() => this.onDeleteOrderClick(item.id)} key={item.id}>
              <Order ingredients={item.ingredients} price={item.totalPrice} />;
            </div>
          );
        });
      } else {
        return null;
      }
    }
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    idToken: state.auth.idToken
  };
};
export default connect(mapStateToProps, { fetchAllBurgers, deleteBurger })(
  Orders
);
