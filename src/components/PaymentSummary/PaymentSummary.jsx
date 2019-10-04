import React, { Component } from 'react'
import visalogo from '../../Images/visa_logo.png';
import mastercardlogo from '../../Images/mastercard-logo.png';
import cashlogo from '../../Images/cash_logo.png';
import './PaymentSummary.css';
import DiscountCodeForm from '../DiscountCodeForm/DiscountCodeForm';
import { connect } from 'react-redux'
import { changePaymentMethod } from '../../store/actions';

export class PaymentSummary extends Component {

    handleChange = (event) => {
        let selectedPaymentMethod = event.target.value;
        this.props.dispatch(changePaymentMethod(selectedPaymentMethod))

    }

    componentDidMount(){
        this.visaBtn.setAttribute('disabled','disabled');
        this.masterBtn.setAttribute('disabled','disabled');
    }

    componentWillUnmount(){
        this.visaBtn.removeAttribute("disabled");
        this.masterBtn.removeAttribute("disabled");
    }

    render() {
        const{selectedPaymentMethod} = this.props;
        return (
            <div className="checkoutpayment_container">
                <div className="checkout__payment">
                    <div className="checkout__payment__imgcontainer">
                        <img src={visalogo} alt=""/>
                        <h6>Visa</h6>
                        <input type="radio" ref={visaBtn => { this.visaBtn = visaBtn; }} checked={selectedPaymentMethod === 'Visa'} name="radio" value='Visa' onChange={this.handleChange}/>
                        <span className="checkmark"></span>
                    </div>

                    <div className="checkout__payment__imgcontainer">
                        <img src={mastercardlogo} alt=""/>
                        <h6>Mastercard</h6>
                        <input type="radio"  ref={masterBtn => { this.masterBtn = masterBtn; }} checked={selectedPaymentMethod === 'Mastercard'} name="radio" value='Mastercard' onChange={this.handleChange}/>
                        <span className="checkmark"></span>
                    </div>

                    <div className="checkout__payment__imgcontainer">
                        <img src={cashlogo} alt=""/>
                        <h6>Cash Payment</h6>
                        <input type="radio" checked={selectedPaymentMethod === 'COD'} name="radio" value='COD' onChange={this.handleChange}/>
                        <span className="checkmark"></span>
                    </div>
                </div>
                <div className="checkout_discountform">
                    <DiscountCodeForm/>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedPaymentMethod:state.selectedPaymentMethod
    }
}

export default connect(mapStateToProps)(PaymentSummary)
