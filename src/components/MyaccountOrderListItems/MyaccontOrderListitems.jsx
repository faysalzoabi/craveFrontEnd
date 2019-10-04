import React from 'react'
import './MyaccountOrderListItems.css';

export default function MyaccontOrderListitems(props) {
    let imageUrl = 'https://api.craveuae.ae:8087/';
    const{order} = props;
    return (
        <div className="orderListItem__container">
            <div className="orderListItem__imgcontainer">
                <img src={imageUrl + order.restaurant[0].image[0]} alt=""/>
            </div>
            <div className="orderListItem__contentswrapper">
                <h4>{order.restaurant[0].name}</h4>
                <div className="orderListItem__itemcontents">
                    <h4>Order Details</h4>
                    <div className="orderListItem__item">
                        <span className="itemTitle">Order ID no:</span><span>{order.orderId}</span>
                    </div>
                    <div className="orderListItem__item">
                        <span className="itemTitle">Date & Time:</span><span>{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="orderListItem__item">
                        <span className="itemTitle">Address:</span><span>{order.deliveryAddress.length > 30 ? (order.deliveryAddress.slice(0,50) + '...') : (order.deliveryAddress)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
