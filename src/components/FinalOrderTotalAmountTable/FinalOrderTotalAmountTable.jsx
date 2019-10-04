import React from 'react'
import './FinalOrderTotalAmountTable.css';


export default function FinalOrderTotalAmountTable(props) {
    const {paymentAmount, orderId, createdAt, avgDeliveryTime} = props;
    return (
        <div className="orderstatus_amountContainer">
                <div className="orderstatus_amountContents">
                        <div className="orderstatus_title">
                            <div>Delivery Information</div>
                        </div>
                        <div className="orderstatus_field">
                            <div className="orderStatus-item1">Order Number:</div>
                            <div className="orderStatus-item2">{orderId}</div>
                        </div>
                        <div className="orderstatus_field">
                            <div className="orderStatus-item1">Ordered on:</div>
                            <div className="orderStatus-item2">{new Date(createdAt).toLocaleString()}</div>
                        </div>
                        <div className="orderstatus_field">
                            <div className="orderStatus-item1">Delivery Time:</div>
                            <div className="orderStatus-item2">{new Date(avgDeliveryTime).toLocaleTimeString()}</div>
                        </div>
                        <div className="orderstatus_field">
                            <div className="orderstatus_payment orderStatus-item1">Pay Amount:</div>
                            <div className="orderstatus_payment orderStatus-item2">{paymentAmount}</div>
                        </div>
                </div>
        </div>
    )
}
