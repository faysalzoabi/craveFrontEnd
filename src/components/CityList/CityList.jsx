import React from 'react'
import './CityList.css';
import { withRouter } from 'react-router-dom';
import {fetchRestData, emptyRestaurantListArray} from '../../store/actions';
import { connect } from 'react-redux';



function CityList(props) {

    function handleClick(area){
        
        let emirateId = area.emiratesId.name;
        let areaId = area._id;
        let cityName = area.emiratesId.name;
        let areaName= area.name;
        let cuisineId = 0;

        //dispatch an action to fetch the list of restaurants
        if(props.restaurantList.length > 0){
            props.dispatch(emptyRestaurantListArray())
            props.dispatch(fetchRestData(emirateId,areaId,cuisineId,cityName,areaName));
            props.handleCloseModal()
        }else{
            props.dispatch(fetchRestData(emirateId,areaId,cuisineId,cityName,areaName));
            props.handleCloseModal()
        }
        //routing to restaurant page
        props.history.push('restaurants');
    }

    return (
        <div className="citySection">
                <h5 className="cityName">{props.city}</h5>
                <div className="cityAreas">
                    <ul>
                            {
                                props.areas
                                .filter(emirate => emirate.emiratesId.name === props.city)
                                .map((area, index) => {
                                    return <li key={index} onClick={() => handleClick(area)}>{area.name}</li>
                                })
                                
                            }
                    </ul>
                </div>
        </div>
            )
}

const mapStateToProps = (state) =>{
    return {
        restaurantList : state.restaurantList
    }
}

export default connect(mapStateToProps)(withRouter(CityList))
