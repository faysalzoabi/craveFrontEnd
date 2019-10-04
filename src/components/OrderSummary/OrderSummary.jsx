import React from 'react';
import './OrderSummary.css';
import { connect } from 'react-redux'
import OrderTableRow from '../OrderTableRow/OrderTableRow';
import { Link } from 'react-router-dom';

function OrderSummary(props) {
    const {cart, selectedRestaurant} = props;
    return (
        <div className="checkout__container__ordersummary">
                <table>
                    <tbody>
                        <tr>
                            <th className="checkoutTh">Product</th>
                            <th className="checkoutTh">Quantity</th>
                            <th className="checkoutTh">Price</th>
                            <th className="checkoutTh">Total</th>
                        </tr>
                        {
                        cart.map((item, index) => {
                            return <OrderTableRow key={index} item={item} />
                        })
                        }
                        
                    </tbody>
                </table>
                <div className="checkoutButtonContainer">
                        <Link to={`/restaurants/${selectedRestaurant.menuAssigned}`} className="orderbutton">Modify Your Order</Link>
                </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    let cart = state.cart;
    let images = state.images;
    let j = 0;
    let mergedCartImage = cart.list.map((item , index) => {
                                    item.img = images[j];
                                    j = j + 1;
                                    return item; 
                                })
    return {
        cart:mergedCartImage,
        selectedRestaurant:state.selectedRestaurant
    }
}

export default connect(mapStateToProps)(OrderSummary)
