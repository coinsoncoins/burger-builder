import * as actionType from "./actions";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
}

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
  totalPrice: 4
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
      // const oldCount = state.ingredients[action.ingredientName];
      // const updatedCount = oldCount + 1;
      // const updatedIngredients = {...state.ingredients};
      // updatedIngredients[action.ingredientName] = updatedCount;
      
      // const priceAddition = INGREDIENT_PRICES[action.ingredientName];
      // const oldPrice = state.totalPrice;
      // const newPrice = oldPrice + priceAddition;

      // //this.updatePurchaseState(updatedIngredients);
      // return {
      //   ...state,
      //   ingredients: updatedIngredients,
      //   totalPrice: newPrice
      // }
    }
    case actionType.REMOVE_INGREDIENT: {
      const oldCount = state.ingredients[action.ingredientName];
      if (oldCount <= 0) {
        return state;
      }
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
      // const updatedCount = oldCount - 1;
      // const updatedIngredients = {...state.ingredients};
      // updatedIngredients[action.ingredientName] = updatedCount;
      
      // const priceDeduction = INGREDIENT_PRICES[action.ingredientName];
      // const oldPrice = state.totalPrice;
      // const newPrice = oldPrice - priceDeduction;

      // return {
      //   ...state,
      //   ingredients: updatedIngredients,
      //   totalPrice: newPrice
      // }
    }
    //this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    //this.updatePurchaseState(updatedIngredients);
    default: 
      return state;
  }
}

export default reducer;

