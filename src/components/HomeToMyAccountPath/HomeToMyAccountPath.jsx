import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './HomeToMyAccountPath.css';

export default function HomeToMyAccountPath() {
    return (
        <div className="routeToHome">
            <Link to='/'>Home</Link>  <FaAngleRight className="angleRight"/> <span>My Account</span>
        </div>
    )
}
