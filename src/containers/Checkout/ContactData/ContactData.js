import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import { purchaseBurger } from "../../../store/actions/order";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validation: {
          required: true
        },
        value: "fastest",
        valid: true
      }
    },
    loading: false,
    formIsValid: false
  };
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  onChangeHandler = (event, key) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElements = {
      ...updatedOrderForm[key]
    };
    updatedFormElements.value = event.target.value;
    updatedFormElements.valid = this.checkValidity(
      updatedFormElements.value,
      updatedFormElements.validation
    );
    updatedFormElements.touched = true;
    updatedOrderForm[key] = updatedFormElements;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };
  orderHandlerClick = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const data = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.price,
      order: formData
    };

    this.setState({ loading: true });
    this.props.purchaseBurger(data, this.props.idToken, this.props.history);
  };
  disabledButton = () => {
    const { salad, bacon, cheese, meat } = this.props;
    const test2 = salad || bacon || cheese || meat;
    if (test2) {
      if (this.state.formIsValid) {
        return (
          <Button disabled={false} btnType="Success">
            ORDER
          </Button>
        );
      } else {
        return (
          <Button disabled={true} btnType="Success">
            ORDER
          </Button>
        );
      }
    } else {
      return (
        <Button disabled={true} btnType="Success">
          ORDER
        </Button>
      );
    }
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form;
    if (this.props.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form onSubmit={this.orderHandlerClick}>
          {formElementArray.map(formElement => {
            return (
              <Input
                touched={formElement.config.touched}
                checkValid={formElement.config.validation}
                key={formElement.id}
                inValid={!formElement.config.valid}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={event => this.onChangeHandler(event, formElement.id)}
              />
            );
          })}
          {this.disabledButton()}
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  if (state.burgerBuilder.ingredients) {
    return {
      ingredients: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      salad: state.burgerBuilder.ingredients.salad,
      bacon: state.burgerBuilder.ingredients.bacon,
      cheese: state.burgerBuilder.ingredients.cheese,
      meat: state.burgerBuilder.ingredients.meat,
      loading: state.order.loading,
      idToken: state.auth.idToken
    };
  } else {
    return {
      idToken: state.auth.idToken
    };
  }
};
export default connect(mapStateToProps, { purchaseBurger })(
  withRouter(ContactData)
);
