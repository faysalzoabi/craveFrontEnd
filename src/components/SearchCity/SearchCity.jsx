import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import {updateSearchArea} from '../../store/actions';
import './SearchCity.css';

export class SearchCity extends Component {

state = {
    searchCity:''
}

handleChange = event => {
    const{value} = event.target
    this.props.dispatch(updateSearchArea(value))
}

render() {
return (
    <div className="searchCityContainer">
        <div className="searchCityContents">
            <input type="text" name="searchRestaurant" onChange={this.handleChange} className="searchCityInput" placeholder="Search your area ..."/>
        </div>
        <div className="searchIconContents">
            <span className="searchIcon">
                <FaSearch/>
            </span>
        </div>
    </div>
)
}
}

export default connect()(SearchCity)
