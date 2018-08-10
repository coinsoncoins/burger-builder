import React, { Component } from 'react';
import Button from "../../components/UI/Button/Button"
import classes from "./Auth.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
    },
      password: {
          elementType: 'input',
          elementConfig: {
              type: 'password',
              placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
      },
    },
    formIsValid: false,
    loading: false
  }

  checkValidity = (value, rules) => {
    if (!rules) {
      return true;
    }
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    // const updatedOrderForm = { ...this.state.controls };
    // const updatedFormElement = { ...updatedOrderForm[inputName] };
    // updatedFormElement.value = event.target.value;
    // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    // updatedFormElement.touched = true;
    // updatedOrderForm[inputName] = updatedFormElement;
    // let formIsValid = true;
    // for (let key in this.state.orderForm) {
    //   formIsValid = this.state.controls[key].valid && formIsValid;
    // }
    this.setState({controls: updatedControls});
  }

  render() {
    let formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => {
          return <Input key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} 
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        })}
        <Button btnType="Success" >SIGN IN</Button>
      </form>
    );
    return (
      <div className={classes.Auth}>
        {form}
      </div>
    );
  }
}

export default Auth;