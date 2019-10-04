import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './RouteToHome.css';

export default function RouteToHome(props) {
    return (
        <div className="location-container">
            <span className="location-content">
                <Link to='/'>Home</Link>  <FaAngleRight className="angleRight"/> {props.selectedArea.searchArea}
            </span>
        </div>
    )
}
