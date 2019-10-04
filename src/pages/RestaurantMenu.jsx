import React, { Component } from 'react'
import Showcase from '../components/Showcase/Showcase';
import {connect} from 'react-redux';
import {fetchMenuList, addSelectedMenu} from '../store/actions';
import Menu from '../components/Menus/Menus';
import './RestaurantMenu.css';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart'; 
import RestaurantTitle from '../components/RestaurantTitle/RestaurantTitle';
import jump from 'jump.js';
import MenuTitle from '../components/MenuTitle/MenuTitle';
import Shimmer from '../components/Shimmer/Shimmer';
import PageProgress from 'react-page-progress';


export class RestaurantMenu extends Component {

  componentDidMount(){
  //fetching and adding menu groups titles to redux store
    this.props.dispatch(fetchMenuList(this.props.match.params.id));
  }

  componentDidUpdate(prevProps){
    let menuId = this.props.match.params.id;
    if(prevProps.menuGroups !== this.props.menuGroups){
        this.props.dispatch(addSelectedMenu(menuId));
    }
  }
  
  handleClick = (index) => {
    let target = '.section' + index;
    jump(target, {
      duration:2000
    })
  }

  render() {
    const {selectedRestaurant, selectedArea} = this.props;
    
    return (
      <>
        <PageProgress color={'#1f5ea9'} height={3}/>
        <Showcase/>
        {
          typeof this.props.menuGroups === 'undefined' || this.props.menuGroups.length === 0 || Object.entries(selectedRestaurant).length === 0 || typeof selectedRestaurant === 'undefined' ? (
            <div className="shimmercontainer"> <Shimmer/> </div>
          ) : (
            <section>
              <RestaurantTitle selectedRestaurant={selectedRestaurant} selectedArea={selectedArea}/>
                <div className="menu-menucard">
                    <div className="menu-categories">
                      <MenuTitle title='Menu Categoreis'/>
                      {this.props.menuGroups.map((val, index) => {
                        return  <button className="menu__menucard__btn" key={index} onClick={() => this.handleClick(index)}>{val.name}</button>
                      })}
                    </div>
                      <Menu/>
                      <ShoppingCart/>
                </div>
            </section>
          )
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuGroups:state.menuGroups,
    selectedRestaurant:state.selectedRestaurant,
    selectedArea:state.selectedArea
  }
}

export default connect(mapStateToProps)(RestaurantMenu)
