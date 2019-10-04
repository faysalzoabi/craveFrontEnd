import React, { Component } from 'react';
import './SearchRestList.css';
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import {searchAndFetchRestaurants, storeRestaurantSearchKeyword} from '../../store/actions';
export class SearchRestList extends Component {

state = {
    searchRestaurant:''
}

handleChange = event => {
    const value = event.target.value;
    const{selectedArea} = this.props;
    let cuisineId = 0;
    let pageNumber = 1;
    this.props.dispatch(searchAndFetchRestaurants(selectedArea.emiratesId, selectedArea.areaId, cuisineId, pageNumber, value));
    this.props.dispatch(storeRestaurantSearchKeyword(value));
}

render() {
return (
    <div className="main">
        <div className="form-group has-search">
            <span className="form-control-feedback"><FaSearch/></span>
            <input type="text" name="searchRestaurant" onChange={this.handleChange} className="form-control" placeholder="Search"/>
        </div>
    </div>
)
}
}

export default connect()(SearchRestList)
