import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import { fetchRestData, emptyRestaurantListArray } from '../../store/actions';
import {Link, withRouter} from 'react-router-dom';
export class Search extends Component {

  
state = {
    searchCity:'',
    searchArea:'',
    searchCuisine:'',
    cityList:[],
    areaList:[],
    cuisineList:[],
    citySelected:false
}


handleChange = event => {
    const {cities, areas, cuisines} = this.props;
    const value = event.target.value;
    if(event.target.name === 'searchCity'){
        if(value.length === 0){
            this.setState({cityList: [], [event.target.name]:value})
        } else {
            const regex = new RegExp(`^${value}`, 'i')
            const cityList = cities.sort().filter(v => regex.test(v));
            this.setState({cityList, [event.target.name]:value});
        }
    } else if(event.target.name === 'searchArea'){
        if(value.length === 0){
            this.setState({areaList: [], [event.target.name]:value})
        } else {
            const regex = new RegExp(`^${value}`, 'i');
            const areaList = areas.sort().filter(v => regex.test(v));
            this.setState({areaList, [event.target.name]:value});
        }
    } else if(event.target.name === 'searchCuisine'){
        if(value.length === 0){
            this.setState({cuisineList:[], [event.target.name]:value})
        }else{
            const regex = new RegExp(`^${value}`,'i');
            const cuisineList = cuisines.sort().filter(v => regex.test(v));
            this.setState({cuisineList, [event.target.name]:value});
        }
    }
}

suggestionSelected(value){
    this.setState({
    searchCity:value,
    cityList : [],
    selected:true 
    })
}

areasuggestionSelected(value){
    this.setState({
    searchArea:value,
    areaList : []
    })
}

cuisinesuggestionSelected(value){
    this.setState({
        searchCuisine:value,
        cuisineList : []
    })
}

renderCitySuggestions () {
const {cityList} = this.state;
if(cityList.length === 0){
    return null;
} 
if(cityList.length > 0) {
return(
    <ul>
        {cityList.map((item, index) => <li key={index} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
    </ul>
    )
}
}

renderAreaSuggestions () {
const {areaList} = this.state;
if(areaList.length === 0){
    return null;
} 
    if(areaList.length > 0) {
    return(
        <ul>
            {areaList.map(item => <li onClick={() => this.areasuggestionSelected(item)}>{item}</li>)}
        </ul>
        )
    }
}

renderCuisineSuggestions() {
    const {cuisineList} = this.state;
    if(cuisineList.length === 0){
        return null;
    } 
    if(cuisineList.length > 0) {
        return(
            <ul>
                {cuisineList.map(item => <li onClick={() => this.cuisinesuggestionSelected(item)}>{item}</li>)}
            </ul>
            )
        }
}

handleClick = event => {
    event.preventDefault();
    const{restaurantList} = this.props;
    const{searchCity, searchArea} = this.state;
    let selectedArea = this.props.areas.find(value => value.name === searchArea);
    let emirateId = selectedArea.emiratesId.name;
    let areaId = selectedArea._id;
    let cuisineId = 0;
    if(restaurantList.length > 0){
        this.props.dispatch(emptyRestaurantListArray())
        this.props.dispatch(fetchRestData(emirateId,areaId,cuisineId,searchCity,searchArea));
    }else{
        this.props.dispatch(fetchRestData(emirateId,areaId,cuisineId,searchCity,searchArea));
    }
    this.props.history.push('restaurants');
    
}

render() {
    const {searchCity, searchArea, searchCuisine} = this.state;
return (
    <div className='form mt-4' onSubmit={this.handleClick}>
        <form autoComplete="off" >
            <div className="autocomplete mr-1" style={{width:'230px'}}>
                <input id="myInput" value={searchCity} onChange={this.handleChange} name="searchCity" type="text" placeholder="&#xf3c5; Emirate/City" style={{color:'red'}} className="fas py-3"/>
                {this.renderCitySuggestions()}
            </div>
            <div className="autocomplete mr-1" style={{width:'230px'}}>
                <input id="myInput" value={searchArea} onChange={this.handleChange} name="searchArea" type="text" placeholder="&#xf3c5; Area Name " style={{color:'red'}} className="fas py-3"/>
                {this.renderAreaSuggestions()}
            </div>
            <div className="autocomplete mr-1" style={{width:'230px'}}>
                <input id="myInput" value={searchCuisine} onChange={this.handleChange} name="searchCuisine" type="text"  placeholder="&#xf805; Cuisines" style={{color:'red'}} className="fas py-3"/>
                {this.renderCuisineSuggestions()}
            </div>
            {/* <Link to='/restaurants'> */}
                <input type="submit"  value="Find Cuisines" />
            {/* </Link> */}
        </form>
    </div>
)
}
}

const mapStateToProps = (state) => {
    return {
    areas : state.areas,
    cuisines:state.cuisines,
    restaurantList : state.restaurantList,
    }
}


export default connect(mapStateToProps)(withRouter(Search))
