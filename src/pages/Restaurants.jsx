  import React, { Component } from 'react';
import Showcase from '../components/Showcase/Showcase';
import Card from '../components/Card/Card';
import SearchRestList from '../components/SearchRestList/SearchRestList';
import KitchenType from '../components/KitchenType/KitchenType';
import Shimmer from '../components/Shimmer/Shimmer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Restaurants.css';
import PageProgress from 'react-page-progress';
import InfiniteScroll from "react-infinite-scroll-component";
import { addSelectedRestaurant, searchAndFetchRestaurants } from '../store/actions';
import RestaurantFilter from '../components/RestaurantFilter/RestaurantFilter';
import RouteToHome from '../components/RouteToHome/RouteToHome';

export class Restaurants extends Component {


  state = {
    selectedRestaurant:{},
    hasMore: true,
    currentPageNo:2,
    items: Array.from({ length: 20 }),
    filteredResults:[]
  }

  //fetching the next pages
  fetchMoreRestaurantData = () => {
    const{selectedArea, pagesNo, searchRestaurantsKeyword} = this.props;
    const{currentPageNo}=this.state;

    if(this.state.currentPageNo > pagesNo) {
      this.setState({ hasMore: false });
      return;
    }

    let cuisineId = 0;
    this.props.dispatch(searchAndFetchRestaurants(selectedArea.emiratesId,selectedArea.areaId, cuisineId, currentPageNo, searchRestaurantsKeyword));
    this.setState({currentPageNo : this.state.currentPageNo + 1});
  }


  handleClick = (selectedRestaurant) => {
    this.props.dispatch(addSelectedRestaurant(selectedRestaurant));
  }


  filterRestaurants = (filteredRestaurantList) => {
    this.setState({filteredResults:filteredRestaurantList});
  }

  render() {
    // filtering the restaurants during the search in the search input box
    const{freeDelivery, newRestaurants, offers, open, selectedArea} = this.props;
    let filteredRestaurantList ;
    
    if(this.props.restaurantList.length > 0) {
      filteredRestaurantList = this.props.restaurantList.filter(rest => {
        return rest.name.toLowerCase().indexOf(this.props.searchRestaurant.toLowerCase()) !== -1
      });
    }
   
    //filter restaurants based on free delivery
    if(typeof freeDelivery !== 'undefined' && freeDelivery) {
        filteredRestaurantList = filteredRestaurantList.filter(rest => {
          if(rest.deliveryCharge === undefined || rest.deliveryCharge > 0) {
              return false;
          }
        return true;
          });
    }
    
    //filter restaurants based on new restaurants
    if(typeof newRestaurants !== 'undefined' && newRestaurants) {
        filteredRestaurantList = filteredRestaurantList.filter(rest => {
          if(rest.new === undefined || rest.new === 0){
            return false;
          }
          return true;
        })
    }


    //filter restaurants based on offers
    if(typeof offers !== 'undefined' && offers) {
        filteredRestaurantList = filteredRestaurantList.filter(rest => {
          if(rest.offer === undefined || rest.offer === 0) {
            return false;
          }
          return true;
        })
    }


    //filter restaurants based on open restaurants
    if(typeof open !== 'undefined' && open) {
        filteredRestaurantList = filteredRestaurantList.filter(rest => {
          if(rest.open === undefined || rest.open === 0) {
            return false;
          }
          return true;
        })
    }

    
    // filtering based on the cuisine selected by the user
    let selectedRestaurantCuisine = [];
    if(this.props.selectedCuisine === "Select all"){
        selectedRestaurantCuisine = this.props.restaurantList;
    } else {
        selectedRestaurantCuisine = this.props.restaurantList.filter(rest => {
        return (rest.cuisine1 || rest.cuisine2 || rest.cuisine3) === this.props.selectedCuisine
      });
    }
    return (
    <div>
      <div>
        <PageProgress color={'#1f5ea9'} height={3}/>
        <Showcase/>
      </div>
      <div>
        <KitchenType/>
      </div>
      <div className="searchmenu mt-3"> 
        <RouteToHome selectedArea={selectedArea}/>
        <SearchRestList selectedArea={selectedArea}/>
        {/* <SelectMenu/> */}
      </div>
      <section className="restaurants-section">
        <aside className="restaurants-aside">
          <RestaurantFilter/>
        </aside>
        <main className="restaurants-main">
          <div className="restaurantsContainer">
          <InfiniteScroll
                  dataLength={this.props.restaurantList.length}
                  next={this.fetchMoreRestaurantData}
                  hasMore={this.state.hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                    </p>
                  }
            >
                    { 
                      !this.props.selectedCuisine ? (
                        typeof this.props.restaurantList === 'undefined' || this.props.restaurantList.length === 0 ? (
                        <div className="shimmercontainer"> <Shimmer/> </div>
                        ):
                        (filteredRestaurantList.map((item, index) => {
                            return  <Link onClick={() => this.handleClick(item)} key={index} to={`/restaurants/${item.menuAssigned}`}><Card restaurant={item}/></Link>
                      }))
                    ):(
                      selectedRestaurantCuisine.map((item, index) => {
                            return  <Link onClick={() => this.handleClick(item)} key={index} to={`/restaurants/${item.menuAssigned}`}><Card restaurant={item}/></Link>
                        })
                      )
                  }
            </InfiniteScroll>
          </div>
        </main>
      </section>
    </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    restaurantList : state.restaurantList,
    searchRestaurant: state.searchRestaurant,
    selectedCuisine:state.selectedCuisine,
    selectedArea:state.selectedArea,
    pagesNo:state.pagesNo,
    freeDelivery:state.itemsChecked.freeDelivery,
    newRestaurants:state.itemsChecked.newRestaurant,
    offers:state.itemsChecked.offers,
    open:state.itemsChecked.open,
    searchRestaurantsKeyword:state.searchRestaurantsKeyword
  }
}

export default connect(mapStateToProps)(Restaurants)
