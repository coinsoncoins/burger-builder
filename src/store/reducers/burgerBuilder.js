import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";
const INITIAL_PRICE = 4;

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

const initialState = {
  ingredients: null,
  totalPrice: INITIAL_PRICE,
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionType.ADD_INGREDIENT: {
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
      return updateObject(state, updatedState);
    }
    case actionType.REMOVE_INGREDIENT: {
      const oldCount = state.ingredients[action.ingredientName];
      if (oldCount <= 0) {
        return state;
      }
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
      return updateObject(state, updatedState);
    }
    case actionType.SET_INGREDIENTS:
      const updatedState = {
        ingredients: {...action.ingredients},
        error: false,
        totalPrice: INITIAL_PRICE
      }
      return updateObject(state, updatedState);
    case actionType.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true })
    default: 
      return state;
  }
}

export default reducer;

