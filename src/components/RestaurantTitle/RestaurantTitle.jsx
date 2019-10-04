import React from 'react'
import './RestaurantTitle.css';
import { FaClock, FaShoppingCart, FaCarSide, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import RestaurantLocation from '../RestaurantLocation/RestaurantLocation';

export default function RestaurantTitle({selectedRestaurant, selectedArea}) {
    let imageUrl = 'https://api.craveuae.ae:8087/';
    return (
    <div className="restaurantmenuContainer">
        <div>
           <RestaurantLocation selectedArea={selectedArea} selectedRestaurant={selectedRestaurant}/>
        </div>
        <div className="restaurantmenu">
            <div className="restaurantmenu-logo-container">
                <img src={imageUrl + selectedRestaurant.image[0]} alt="restaurantImage"/>
            </div>
            <div className="restaurantmenu-title">
                <span className="restaurantmenu-detail-name">{selectedRestaurant.name}</span>
                <p>{`${selectedRestaurant.cuisine1} / ${selectedRestaurant.cuisine2} / ${selectedRestaurant.cuisine2}`}</p>
                <p>Open Time: <span className="restaurantmenu-timing">{selectedRestaurant.workingHour[0].openTime}</span></p>
                <p>Close Time: <span className="restaurantmenu-timing">{selectedRestaurant.workingHour[0].closeTime}</span></p>
            </div>
            <div className="restaurantmenu-contentsContainer">
                <small className="text-muted restaurantCart-content">
                    {selectedRestaurant.open === 1 ? (<FaCheckCircle className='greenTick'/>) : (<FaTimesCircle className='redTick'/>)}
                    Status: <span className="restaurantCart-item">{selectedRestaurant.open === 1 ? ('Open') : ('Close')}</span>
                </small>
                <small className="text-muted restaurantCart-content"><FaClock style={{fontSize:'1.3rem'}}/> Est. Time: <span className="restaurantCart-item">{selectedRestaurant.avgDeliveryTime} Min.</span></small>
                <small className="text-muted restaurantCart-content"><FaCarSide style={{fontSize:'1.3rem'}}/> Delivery: <span className="restaurantCart-item">{selectedRestaurant.deliveryCharge} AED</span></small>
                <small className="text-muted restaurantCart-content"><FaShoppingCart style={{fontSize:'1.3rem'}}/> Minimum: <span className="restaurantCart-item">{selectedRestaurant.minPriceForHomeDelivery} AED</span> </small>
            </div>
            
        </div>
    </div>
    )
}
