// import React, { Component } from 'react'
import ProductCard from '../ProductCard/ProductCard';
import './productCardContainer.css';
import { connect } from 'react-redux'
import React from 'react'

function ProductCardContainer(props) {
    let {productList, menuSearchedKeyword, selectedRestaurant, selectedMenu, isAuthenticated, cart} = props;
    let filteredProducts = productList.filter(item => item.name.toLowerCase().indexOf(menuSearchedKeyword.toLowerCase()) !== -1)
  return (
    <div className='cardContainer'>
            {
              filteredProducts.map((item, index) => {
                return <ProductCard key={index} product={item} selectedRestaurant={selectedRestaurant} selectedMenu={selectedMenu} isAuthenticated={isAuthenticated} cart={cart}/>
              })
            }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    menuSearchedKeyword:state.menuSearchedKeyword,
    selectedRestaurant:state.selectedRestaurant,
    selectedMenu:state.selectedMenu,
    isAuthenticated:state.isAuthenticated,
    cart:state.cart
  }
}

export default connect(mapStateToProps)(ProductCardContainer)
