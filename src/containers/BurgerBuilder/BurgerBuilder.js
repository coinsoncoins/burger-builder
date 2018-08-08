import React, { Component } from 'react';

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get("/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      }).catch(error => {
        this.setState({error: true})
        console.log(error);
      })
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i]));
    }
    queryParams.push('price=' + this.props.totalPrice);
    this.props.history.push('/checkout?'+queryParams.join("&"));
  }

  wasAnyIngredientAdded = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // addIngredientHander = (type) => {
  //   const oldCount = this.props.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {...this.props.ingredients};
  //   updatedIngredients[type] = updatedCount;
    
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
  //   this.updatePurchaseState(updatedIngredients);
  // }
  
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.props.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {...this.props.ingredients};
  //   updatedIngredients[type] = updatedCount;
    
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;

  //   this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = this.props.ingredients[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> : <Spinner />;
    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls 
            ingredientAdded={this.props.onAddIngredient} 
            ingredientRemoved={this.props.onRemoveIngredient}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.wasAnyIngredientAdded(this.props.ingredients)}/>
        </React.Fragment>  
      );
      orderSummary = <OrderSummary
        show={this.state.purchasing}
        ingredients={this.props.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice} />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
    onRemoveIngredient: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

