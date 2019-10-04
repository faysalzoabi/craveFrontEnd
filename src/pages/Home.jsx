import React, { Component } from 'react'
import Header from '../components/Header/Header';
// import Navbar from '../Navbar/Navbar';
import './Home.css';
import {connect} from 'react-redux';
import {fetchAreaData, fetchCuisineData, storeUserCoordinates} from '../store/actions';


class Home extends Component {

  componentDidMount() {
    this.props.dispatch(fetchAreaData())
    this.props.dispatch(fetchCuisineData())
    if('geolocation' in navigator){
      let geoLocation = [];
      navigator.geolocation.getCurrentPosition(
          pos => {
            geoLocation[0] = pos.coords.latitude;
            geoLocation[1] = pos.coords.longitude;
            this.props.dispatch(storeUserCoordinates(geoLocation))
          },
          error_message => console.log('Error occured while retrieving', error_message) )
    } else {
      console.log('Geo location is Not Enabled')
    }
    
  }
  
  render() {
    return (
      <div className="showcase">
        <Header/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    areas : state.areas
  }
}

export default connect(mapStateToProps)(Home)
