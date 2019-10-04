import React, { Component } from 'react'
import Showcase from '../components/Showcase/Showcase';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import OrderSummaryTitle from '../components/OrderSummaryTitle/OrderSummaryTitle';
import PaymentSummary from '../components//PaymentSummary/PaymentSummary';
import CheckAmount from '../components/CheckoutAmount/CheckoutAmount';
import DeliverySummary from '../components/DeliverySummary/DeliverySummary';
import DeliveryAddress from '../components/DeliverAddress/DeliveryAddress';
import { connect } from 'react-redux';
import './Checkout.css';


class Checkout extends Component {

    render() {
        const{textAreaOrderRequest} = this.props;
        return (
            <>
                <Showcase/>
                <div className="checkout__container_wrapper">
                    <div className="checkout__container__order">
                        <OrderSummaryTitle title="Your order Summary"/>
                        <OrderSummary/>
                    </div>
                    <div className="checkout__container__delivery">
                        <OrderSummaryTitle title="Do you have special request?"/>
                        <DeliverySummary  textAreaOrderRequest={textAreaOrderRequest}/>
                    </div>
                    <div className="checkout__container__address">
                        <OrderSummaryTitle title="Where do you want to be delivered?"/>
                        <DeliveryAddress/>
                    </div>
                    <div className="checkout__container__payment">
                        <OrderSummaryTitle title="Payment Summary"/>
                        <PaymentSummary/>
                    </div>
                    <div className="checkout__container__total">
                        <OrderSummaryTitle title="Total Amount"/>
                        <CheckAmount/>
                    </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        customerAddress: state.customerAddress,
        textAreaOrderRequest:state.textAreaOrderRequest
    }
  }

export default connect(mapStateToProps)(Checkout)
