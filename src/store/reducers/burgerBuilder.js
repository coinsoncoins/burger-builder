import * as actionType from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
}

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
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
    }
    case actionType.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {...action.ingredients},
        error: false
      }
    case actionType.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default: 
      return state;
  }
}

export default reducer;

