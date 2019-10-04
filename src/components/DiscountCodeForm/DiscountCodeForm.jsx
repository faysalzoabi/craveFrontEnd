import React, { Component } from 'react'
import './DiscountCodeForm.css';
import { connect } from 'react-redux'
import {applyPromoCode} from '../../store/actions';

export class DiscountCodeForm extends Component {

state={
    inputValue:''
}

constructor(props){
    super(props);
    this.promoBtn = React.createRef();
}

handleChange = (event) => {
    this.setState({inputValue:event.target.value})
}

handleSubmit = (event) =>{
    const {cartTotalAmount,selectedRestaurant} = this.props;
    const {inputValue} = this.state;
    event.preventDefault();
    if(inputValue){
        this.props.dispatch(applyPromoCode(selectedRestaurant._id,cartTotalAmount.totalAmount,inputValue));
        this.promoBtn.setAttribute("disabled","disabled");
    }
    
}

componentDidUpdate(prevProps){
    if(this.props.promoModal === true && this.props.invalidPromo){
        this.promoBtn.removeAttribute("disabled");
    }
    
}

componentWillUnmount(){
    this.promoBtn.removeAttribute("disabled");
}

render() {
    return (
        <form className="discountForm" onSubmit={this.handleSubmit}>
            <label htmlFor="code">
                <span>Discount Code:</span> 
            <input className="discountinputbox" type="text" id="code" value={this.state.value} onChange={this.handleChange} placeholder="Enter your promo code .." required/>
            </label>
            <button ref={promoBtn => {this.promoBtn = promoBtn;}} className="orderbutton discountapplybtn" type="submit" value="Submit">Apply Code</button>
        </form>
    )
}
}

const mapStateToProps = (state) => {
    return{
        selectedRestaurant:state.selectedRestaurant,
        cartTotalAmount:state.cartTotalAmount,
        promoCodeResObj:state.promoCodeResObj,
        invalidPromo:state.invalidPromo,
        promoModal:state.promoModal
    }
}

export default connect(mapStateToProps)(DiscountCodeForm)
