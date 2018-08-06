import React, { Component } from 'react';
import Modal from "../../components/UI/Modal/Modal";

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      })
      this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({error: error});
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHander = () => {
      this.setState({error: null});
    }
    render() {
      return (
        <React.Fragment>
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHander}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }
}

export default errorHandler;