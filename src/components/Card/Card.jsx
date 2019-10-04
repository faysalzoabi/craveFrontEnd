import React from 'react';
import { FaClock, FaShoppingCart, FaCarSide, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// import {IoMdCloseCircle} from "react-icons/io";
// import {connect} from 'react-redux';
// import {updateSelectedRestaurant} from '../store/actions';
import './Card.css';
import closeLogo from '../../Images/closed-rest.png'


export default function Card(props) {
    let imageUrl = 'https://api.craveuae.ae:8087/';
    return (
        <div className="restaurantsResults_inner">
            <div className="restaurantCard">
                <div className="restaurants_Logo">
                    {
                        props.restaurant.open === 0 ? (
                            <img src={closeLogo} className="restaurants_logo_img" alt=""/>
                        ) : (
                            <img src={imageUrl + props.restaurant.image[0]}  className="restaurants_logo_img" alt=""/>
                        )
                    }
                </div>
                <div className="restaurantCard_body_title">
                        <h5 className="card-title">{props.restaurant.name}</h5>
                        <p className="card-subtitle">
                        {props.restaurant.cuisine1} / {props.restaurant.cuisine2} / {props.restaurant.cuisine3}
                        </p>
                </div>
                <>
                {props.restaurant.offer ? (
                    <div className="restaurantCart_offerlogo">
                        <span>{props.restaurant.offer}%</span>
                        <small className="offerlogo_off">OFF</small> 
                    </div>
                ) : (
                    <div className="noOffer"></div>
                ) }
                </>
                <div className="restaurantCard-body">
                    <div className="text-muted restaurantCart-content">
                        {props.restaurant.open === 1 ? (<FaCheckCircle className='greenTick'/>) : (<FaTimesCircle className='redTick'/>)}
                        Status: <span className="restaurantCart-item">{props.restaurant.open === 1 ? ('Open') : ('Close')}</span>
                    </div>
                    <div className="text-muted restaurantCart-content"><FaClock style={{fontSize:'1.3rem'}}/> Est. Time: <span className="restaurantCart-item">{props.restaurant.avgDeliveryTime} Min.</span></div>
                    <div className="text-muted restaurantCart-content"><FaCarSide style={{fontSize:'1.3rem'}}/> Delivery: <span className="restaurantCart-item">{props.restaurant.deliveryCharge === 0 ? (<span className='restaurantCart-fee'>Free</span>): (props.restaurant.deliveryCharge + 'AED')} </span></div>
                    <div className="text-muted restaurantCart-content"><FaShoppingCart style={{fontSize:'1.3rem'}}/> Minimum: <span className="restaurantCart-item">{props.restaurant.minPriceForHomeDelivery} AED</span> </div>
                </div>
            </div>
        </div>
    )
}


