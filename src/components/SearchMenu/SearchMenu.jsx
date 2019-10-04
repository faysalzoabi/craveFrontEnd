import React, { Component } from 'react';
import './SearchMenu.css';
import { connect } from 'react-redux';
import {searchInTheMenu} from '../../store/actions';
export class SearchMenu extends Component {

state = {
    searchMenu:''
}


handleChange = event => {
    const value = event.target.value;
    this.setState({[event.target.name]:value}, () => {
    this.props.dispatch(searchInTheMenu(this.state.searchMenu))
    })
}

render() {
    return (
        <div className="wrap">
            <div className="search">
                <input type="text" name="searchMenu" onChange={this.handleChange} className="searchTerm" placeholder="What are you looking for?"/>
                <button type="submit" className="searchButton">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
    )
}
}

export default connect()(SearchMenu)
