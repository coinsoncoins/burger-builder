import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
      dispatch(purchaseBurgerStart());
      console.log("[ContactData] orderHandler");
      // this.setState({loading: true});
      // const formData = {};
      // for (let key in this.state.orderForm) {
      //   formData[key] = this.state.orderForm[key].value;
      // }
      // const order = {
      //   ingredients: this.props.ingredients,
      //   price: this.props.totalPrice,
      //   orderData: formData
      // }
      axios.post('/orders.json', orderData)
        .then(response => {
          console.log(response.data.id);
          dispatch(purchaseBurgerSuccess(response.data.id, orderData));
        }).catch(error => {
          dispatch(purchaseBurgerFail(error));
        })
  }
}