import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import instance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  fetchIngredients
} from "../../store/actions/burgerBuilder";
export class BurgerBuilder extends Component {
  state = {
    showModal: false,
    loading: false
  };
  componentDidMount() {
    this.props.fetchIngredients();

    // axios
    //   .get("https://burger-b0143.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(err => console.log(err));
  }
  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  // };

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  // };
  onModalButtonClick = () => {
    this.setState({ showModal: true });
  };
  onBackDropClick = () => {
    this.setState({ showModal: false });
  };
  onContinueBtnSuccess = () => {
    this.props.history.push("/checkout");
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push(`price=${this.state.totalPrice}`);
    // const queryString = queryParams.join("&");
    // this.props.history.push({
    //   pathname: "/checkout",
    //   search: `?${queryString}`
    // });
  };
  showLoader = () => {
    let loaderOrSummary = (
      <OrderSummary
        onContinueBtnSuccess={this.onContinueBtnSuccess}
        onBackDropClick={this.onBackDropClick}
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
      />
    );
    if (this.state.loading) {
      loaderOrSummary = <Spinner />;
    }
    return loaderOrSummary;
  };
  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    const test =
      disabledInfo.salad &&
      disabledInfo.bacon &&
      disabledInfo.cheese &&
      disabledInfo.meat;
    if (this.props.ingredients) {
      return (
        <Aux>
          <Modal
            onBackDropClick={this.onBackDropClick}
            show={this.state.showModal}
          >
            {this.showLoader()}
          </Modal>

          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredientHandler={this.props.addIngredient}
            removeIngredientHandler={this.props.removeIngredient}
            disabledInfo={disabledInfo}
            price={this.props.totalPrice}
            purchaseBtn={test}
            onOrderButtonClick={this.onOrderButtonClick}
            onModalButtonClick={this.onModalButtonClick}
          />
        </Aux>
      );
    } else {
      return <Spinner />;
    }
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice
  };
};

export default connect(mapStateToProps, {
  addIngredient,
  removeIngredient,
  fetchIngredients
})(WithErrorHandler(BurgerBuilder, instance));
