import React from 'react'
import { connect } from 'react-redux';
import ShoppingCartTotalAmount from '../ShoppingCartTotalAmount/ShoppingCartTotalAmount';
import './ShoppingCartItems.css';
import {emptyShoppingCart, emptyIngredients, openCheckoutModal, openMinOrderModal} from '../../store/actions';
import ShoppingCartDetails from '../ShoppingCartDetails/ShoppingCartDetails';
import { Link } from 'react-router-dom';
import { IoIosCart } from "react-icons/io";


function ShoppingCartItems(props) {

        function handleClick() {
          props.dispatch(emptyShoppingCart());
          props.dispatch(emptyIngredients());
        }

        function handleOpeningModal() {
          props.dispatch(openCheckoutModal());
        }

        function handleOpeningMinOrderModal() {
          props.dispatch(openMinOrderModal());
        }

  const { cart, minPriceForHomeDelivery, isAuthenticated } = props;

  return (
    <div>
      <div className="shoppingCartDetailsContainer">
        {cart.list.map((value, index) => {
          return <ShoppingCartDetails key={index} item={value} />;
        })}
      </div>
      <ShoppingCartTotalAmount cart={cart} />
      <div className="cartButtons">
        {isAuthenticated ? (
          cart.offerAmount > 0 &&
          cart.offerAmount >= minPriceForHomeDelivery ? (
            <Link to="/checkout">
              <button
                className={
                  cart.offerAmount >= minPriceForHomeDelivery
                    ? "orderbutton"
                    : "disabledorderbutton disabled"
                }
              >
                Go to Check Out
              </button>
            </Link>
          ) : cart.totalAmount >= minPriceForHomeDelivery ? (
            <Link to="/checkout">
              <button
                className={
                  cart.totalAmount >= minPriceForHomeDelivery
                    ? "orderbutton"
                    : "disabledorderbutton disabled"
                }
              >
                Go to Check Out
              </button>
            </Link>
          ) : (
            <button
              onClick={handleOpeningMinOrderModal}
              className="disabledorderbutton disabled"
            >
              Go to Check Out
            </button>
          )
        ) : (
          <button
            onClick={handleOpeningModal}
            className="disabledorderbutton disabled"
          >
            Go to Check Out
          </button>
        )}
        <button onClick={handleClick} className="btn btn-danger">
          Empty <IoIosCart className="emptyCart"/>
        </button>
      </div>
    </div>
  );
}

export default connect()(ShoppingCartItems)


