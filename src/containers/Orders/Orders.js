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
    this.props.onInitLoad();
    // axios.get("/orders.json")
    //   .then((response) => {
    //     const fetchedOrders = [];
    //     for(let key in response.data) {
    //       fetchedOrders.push({
    //         ...response.data[key],
    //         id: key
    //       });
    //     }
    //     this.setState({orders: fetchedOrders, loading: false})
    //   }).catch((error) => {
    //     this.setState({loading: false});
    //     console.log(error);
    //   })
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
    loading: state.order.ordersLoading,
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitLoad: () => dispatch(actions.fetchOrders())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));