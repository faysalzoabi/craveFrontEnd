import React from 'react'
import { FaAngleRight } from "react-icons/fa";
import './RestaurantLocation.css';
import { Link } from 'react-router-dom';

export default function RestaurantLocation(props) {
    return (
        <div className="restaurantLocation-container">
            <span className="restaurantLocation-content">
                <Link to='/'>Home</Link>  <FaAngleRight className="angleRight"/> <Link to='/restaurants'>{props.selectedArea.searchArea}</Link> <FaAngleRight className="angleRight"/> {props.selectedRestaurant.name} 
            </span>
        </div>
    )
}
