import React from 'react'
import { connect } from 'react-redux'
import './ShoppingCartTotalAmount.css';


function ShoppingCartTotalAmount(props) {
    const{cart} = props;
    return (
        <div className="cart__calc">
                <div className="cart__calc__contents">
                    <span className="cart_calc mutingText cartFontSize" >Subtotal </span>
                    <span className="cart_calc mutingText cartFontSize">{`${cart.totalAmount} AED`}</span>
                </div>
                <div className="cart__calc__contents">
                    <span className="cart_calc redHightlight cartFontSize" >Offer Amount </span>
                    <span className="cart_calc redHightlight cartFontSize">{`-${cart.offerAmount} AED`}</span>
                </div>
                <div className="cart__calc__contents deliveryFeeContainer">
                    <span className="cart_calc mutingText cartFontSize" >Delivery Fee </span>
                    <span className="cart_calc mutingText cartFontSize">{`${cart.list[0].deliveryCharge} AED`}</span>
                </div>
                <div className="cart__calc__contents">
                    <span className="cart_calc cart_calc_total"><b>Total Amount</b></span>
                    <span className="cart_calc cart_calc_totalAmount"><b>{`${cart.totalAmount - cart.offerAmount + cart.list[0].deliveryCharge} AED`}</b></span>
                </div>
                
        </div>
    )
}

export default connect()(ShoppingCartTotalAmount)
