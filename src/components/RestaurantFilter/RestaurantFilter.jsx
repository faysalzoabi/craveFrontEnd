import React, { Component } from 'react';
import { updateFilterStatus } from '../../store/actions';
import './RestaurantFilter.css'
import { connect } from 'react-redux';

export class RestaurantFilter extends Component {
    state = {
        itemChecked:{}
    }

    handleCheckBoxChange = (event) => {
        let itemChecked = this.state.itemChecked;
        itemChecked[event.target.name] = event.target.checked
        this.setState({itemChecked}, () => {
            this.props.dispatch(updateFilterStatus(itemChecked))
        });
    }
    render() {
        console.log('itemchecked', this.state.itemChecked)
        return (
            <div className="filterContainer">
                <div className="filterTitle">
                    <span className="filterTitle__copy">Filter By</span>
                </div>
                <div className="filterContents">
                    <label htmlFor="freeDelivery">
                        <input className="inputFilter" type="checkbox" name="freeDelivery" checked={this.state.freeDelivery} onChange={this.handleCheckBoxChange} id="freeDelivery"/>
                        <span>Free Delivery</span>
                    </label>
                    <label htmlFor="newRestaurant">
                        <input className="inputFilter" type="checkbox" name="newRestaurant" checked={this.state.newRestaurant} onChange={this.handleCheckBoxChange} id="newRestaurant"/>
                        <span>New Restaurants</span>
                    </label>
                    <label htmlFor="offers">
                        <input className="inputFilter" type="checkbox" name="offers" checked={this.state.offers} onChange={this.handleCheckBoxChange} id="offers"/>
                        <span>Offers</span>
                    </label>
                    <label htmlFor="open">
                        <input className="inputFilter" type="checkbox" name="open" checked={this.state.offers} onChange={this.handleCheckBoxChange} id="open"/>
                        <span>Open</span>
                    </label>
                </div>
            </div>
        )
    }
}

export default connect()(RestaurantFilter)
