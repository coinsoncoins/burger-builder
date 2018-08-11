import React, { Component } from 'react';
import classes from "./Orders.css";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from 'react-redux';


class Orders extends Component {

  componentDidMount() {
    this.props.onInitLoad(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />
    if (this.props.orders) {
      orders = this.props.orders.map((order, index) => {
        return <Order 
          key={order.id} 
          ingredients={order.ingredients}
          price={+order.price}
        />
      })
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitLoad: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));