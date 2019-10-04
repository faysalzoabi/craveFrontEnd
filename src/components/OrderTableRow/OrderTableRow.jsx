import React from 'react'
import './OrderTableRow.css';
import craveLogo from '../../Images/crave_default_logo.png';


export default function OrderTableRow({item}) {
    let imageUrl = 'https://api.craveuae.ae:8087/';
    return (
        <tr>
            {
                item.img ? (
                    <td className="checkoutTd"><img className="productImg" src={imageUrl + item.img} alt=""/>{item.productId.name}</td>
                ) : (
                    <td className="checkoutTd"><img className="productImg_default" src={craveLogo} alt=""/>{item.productId.name}</td>
                )
            }
            <td className="checkoutTd">{item.quantity}</td>
            <td className="checkoutTd">{`${item.productId.price} AED`}</td>
            <td className="checkoutTd">{`${item.quantity * item.productId.price} AED`}</td>
        </tr>
    )
}
