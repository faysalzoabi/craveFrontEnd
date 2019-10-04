import React from 'react'
import './OrderSummaryTitle.css';


export default function OrderSummaryTitle({title}) {
    return (
        <div className="checkout__container_title">
            {title}
        </div>
    )
}
