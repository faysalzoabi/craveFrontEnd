import React from 'react'
import './FinalOrderTable.css';
import craveLogo from '../../Images/crave_default_logo.png';


export default function FinalOrderTable(props) {
    const {products} = props;
    const imageUrl="https://api.craveuae.ae:8087/"
    return (
    <div className="orderstatus_table">
        <table>
                <tbody>
                    <tr className="orderStatusTableHeadRow">
                        <th>Product</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    {
                        products.map((item, index) => {
                        return( <tr className="orderstatus_tablerow" key={index}>
                                        <td>
                                            <div className="orderstatus_tableimg">
                                                {
                                                    item.productId[0].image[0] ? (
                                                        <img src={`${imageUrl}${item.productId[0].image[0]}`} alt=""/>
                                                    ) : (
                                                        <img src={craveLogo} className="orderstatusCard-img" alt=""/>
                                                    )
                                                }
                                            
                                            </div>
                                        </td>
                                        <td>{item.productId[0].name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.productId[0].price}</td>
                                </tr>
                                )
                            })
                    }
            </tbody>
        </table>
    </div>
    )
}
