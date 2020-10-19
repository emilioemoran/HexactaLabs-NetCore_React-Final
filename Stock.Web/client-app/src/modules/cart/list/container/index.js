import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Presentation from "../presentation/index";
import {
  getCarts,
  fetchLocal,
  checkoutProducts, totalPrice
} from "../index";

export class CartPage extends Component {
  render() {
    return (
      <Presentation
        data={this.props.carts}
        checkoutProducts={checkoutProducts}
        totalPrice={totalPrice(this.props.carts)}
        defaultPageSize={5}
        dataLoading={this.props.loading}
        {...this.props}
      />
    );
  }
}

CartPage.propTypes = {
  carts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return { carts: getCarts(state)};
};

const mapDispatchToProps = {
  fetchLocal,
  checkoutProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
