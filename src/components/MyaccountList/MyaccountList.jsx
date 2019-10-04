import React from 'react'
import './MyaccountList.css';
import { Link } from 'react-router-dom'

export default function MyaccountList() {
    return (
        <>
            <h1 className="menuItemsTitle">MY ACCOUNT</h1> 
            <div className="menuItemsContainer">
                <ul className="menuContents">
                    <li>
                        <Link to="/account/myorder-history/">Orders</Link>
                    </li>
                    <li>
                        <Link to="/account/mydetails/" >Personal Data</Link>   
                    </li>
                </ul>
            </div>
        </>
    )
}
