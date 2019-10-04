import React, { Component } from 'react'
import { connect } from 'react-redux'
import './CheckoutAmount.css';
import {placeOrder} from '../../store/actions';
// import Notification from '../Notification/Notification';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {withRouter} from 'react-router-dom';



// import { Redirect } from 'react-router-dom'
export class CheckoutAmount extends Component {
    
    state = {
        isLoading:false
    }
    constructor(props) {
        super(props);
        this.notificationDOMRef = React.createRef();
        this.btn = React.createRef();
    }

    handleClick = (totalAmount, offerAmount, deliveryAddressId, textAreaOrderRequest, selectedPaymentMethod) => {
        this.setState({isLoading:true});
        this.btn.setAttribute("disabled", "disabled");
        const{orderType, cart, selectedUserAddress, selectedRestaurant} = this.props
        let calculatedTotal = totalAmount + selectedRestaurant.deliveryCharge;
        let payAmount = calculatedTotal - offerAmount;
        this.props.dispatch(placeOrder(calculatedTotal, payAmount, offerAmount, orderType, deliveryAddressId, textAreaOrderRequest, selectedUserAddress.latLong, cart.address.latLong,selectedPaymentMethod));
    }

    addNotification = () => {
        this.notificationDOMRef.current.addNotification({
        title: "Error",
        message: "Please select or add a new delivery address!",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 2000 },
        dismissable: { click: true }
    });
    }

    componentDidUpdate(prevProps){
        if(this.props.placedOrderId !== prevProps.placedOrderId){
            this.props.history.push(`/orderstatus/${this.props.placedOrderId}`)
        }  
        if(this.props.placeOrderStatus && this.state.isLoading === true){
            this.btn.removeAttribute("disabled");
            this.setState({isLoading:false});
        }
    }

    componentWillUnmount(){
        this.btn.removeAttribute("disabled");
    }

    render() {
        const {cartTotalAmount, selectedUserAddress, orderType, textAreaOrderRequest,selectedRestaurant, promoCodeResObj, selectedPaymentMethod} = this.props;
        const {isLoading} = this.state;
        return (
            <div className="checkout__container">
                <div className="checkout__info">
                            <div className="checkout_contents">
                                <span>Subtotal</span>
                                {
                                        <span className="fieldvalue ">{`${cartTotalAmount.totalAmount} AED`}</span>
                                    
                                }
                            </div>
                            <div className="checkout_contents">
                                <span className="redFont">Offer Amount</span>
                                {
                                    Object.entries(promoCodeResObj).length !== 0 && promoCodeResObj.constructor === Object && typeof promoCodeResObj !== "undefined" ? (
                                        <span className="redFont fieldvalue">{`-${cartTotalAmount.totalAmount - promoCodeResObj.updatedPrice} AED`}</span>
                                    ) : (cartTotalAmount.offerAmount > 0 ? (
                                        <span className="redFont fieldvalue">{`-${cartTotalAmount.totalAmount - cartTotalAmount.offerAmount} AED`}</span>
                                    ) : (
                                        <span className="redFont fieldvalue">0 AED</span>
                                    )
                                    )
                                }
                            </div>
                            <div className="checkout_contents deliveryCharges">
                                <span >Delivery Charges</span>
                                <span className="fieldvalue">{`${selectedRestaurant.deliveryCharge} AED`}</span>
                            </div>
                            <div className="checkout_contents">
                                <span className="checkout__tablebody__payamount">Pay Amount</span>
                                {
                                    Object.entries(promoCodeResObj).length !== 0 && promoCodeResObj.constructor === Object && typeof promoCodeResObj !== "undefined" ? (
                                        <span className="makeitgreen fieldvalue">{`${promoCodeResObj.updatedPrice + selectedRestaurant.deliveryCharge} AED`}</span>
                                    ) : (cartTotalAmount.offerAmount > 0? (
                                        <span className="fieldvalue">{`${cartTotalAmount.offerAmount + selectedRestaurant.deliveryCharge} AED`}</span>
                                    ) : (
                                        <span className="fieldvalue">{`${cartTotalAmount.totalAmount + selectedRestaurant.deliveryCharge} AED`}</span>
                                    ))
                                }
                                
                            </div>
                </div>
                <ReactNotification ref={this.notificationDOMRef} />
                <button ref={btn => { this.btn = btn; }} onClick={   
                                    selectedUserAddress._id === undefined && orderType === 3 ? (
                                        this.addNotification
                                    ) : (
                                        () => this.handleClick(cartTotalAmount.totalAmount, cartTotalAmount.offerAmount, selectedUserAddress._id, textAreaOrderRequest, selectedPaymentMethod)
                                    )
                                    
                                } 
                        className="checkoutout__btn">
                            {isLoading && <i className="fas fa-spinner fa-spin fa-lg"></i>} 
                            {isLoading && <span> Processing Your Order</span>}
                            {!isLoading && <span>Order Your Food</span>}
                </button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        cartTotalAmount:state.cartTotalAmount,
        selectedUserAddress: state.selectedUserAddress,
        orderType: state.orderType,
        textAreaOrderRequest:state.textAreaOrderRequest,
        cart: state.cart.restInfo,
        placedOrderId:state.placedOrderId,
        selectedRestaurant:state.selectedRestaurant,
        promoCodeResObj:state.promoCodeResObj,
        selectedPaymentMethod:state.selectedPaymentMethod,
        placeOrderStatus: state.placeOrderStatus,
        // deliveryStatus:state.deliveryStatus
    }
  }
export default connect(mapStateToProps)(withRouter(CheckoutAmount))
