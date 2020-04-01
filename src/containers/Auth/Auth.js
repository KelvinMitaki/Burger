import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import { authStart } from "../../store/actions/auth";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
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
  onChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };
  onFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state.controls;
    this.props.authStart(email.value, password.value, this.state.isSignUp);
  };
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
    });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementArray.map(formElement => {
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
    });
    if (this.props.loading) {
      return (
        <div className={classes.Auth}>
          <Spinner />
        </div>
      );
    } else {
      if (this.props.idToken) {
        return <Redirect to="/" />;
      } else {
        return (
          <div className={classes.Auth}>
            <h3> {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</h3>
            {this.props.error ? (
              <h3 style={{ color: "red" }}>{this.props.error}</h3>
            ) : (
              ""
            )}

            <form onSubmit={this.onFormSubmit}>
              {form}
              <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button clicked={this.switchAuthModeHandler} btnType="Danger">
              SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
            </Button>
          </div>
        );
      }
    }
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    idToken: state.auth.idToken
  };
};

export default connect(mapStateToProps, { authStart })(Auth);
