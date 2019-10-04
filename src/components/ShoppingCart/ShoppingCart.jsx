import React, { Component } from 'react'
import './ShoppingCart.css';
import { connect } from 'react-redux'
import ShoppingCartItems from '../ShoppingCartItems/ShoppingCartItems';
import LoadingOverlay from 'react-loading-overlay'; 
import ShoppingCartSpinner from '../ShoppingCartSpinner/ShoppingCartSpinner';
import DeliverySwitch  from '../DeliverySwitch/DeliverySwitch';
import {fetchItemsOfCart} from '../../store/actions';

class ShoppingCart extends Component {

  componentDidMount() {
    this.props.dispatch(fetchItemsOfCart())
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) 
      this.props.dispatch(fetchItemsOfCart())
  }

  render() {
    const {cart, isActive, selectedRestaurant, isAuthenticated} = this.props;
    return (
      <div className="shoppingcartcontainer"> 
      <LoadingOverlay
      active={isActive}
      spinner={<ShoppingCartSpinner/>}
      text=''
      styles={{
        overlay: {
          background: 'rgba(0,0,0,0.4)',
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: '0px',
          left: '0px',
          display: 'flex',
          textAlign: 'center',
          fontSize: '1.2em',
          color: '#FFF',
          zIndex: '800',
        }
      }}
      classNamePrefix='MyLoader_'
      >
        <div className='shoppingcart'>
          <h2 className="py-2">Your Bag</h2>
                <div className='bag'>
                    {
                      isAuthenticated ? (
                        (Object.keys(cart).length === 0 && cart.constructor === Object) || cart.list.length === 0 ? (
                          <i className="fas fa-shopping-bag fa-7x shopping-bag"></i>
                        ) : (
                          <>
                            <div className="shoppingcart_minorder">
                              {`Delivery Minimum: ${selectedRestaurant.minPriceForHomeDelivery.toFixed(2)}`}
                            </div>
                            <DeliverySwitch/>
                            <ShoppingCartItems cart={cart} minPriceForHomeDelivery={selectedRestaurant.minPriceForHomeDelivery} isAuthenticated={isAuthenticated}/>
                          </>
                          )
                      ) : (
                        <i className="fas fa-shopping-bag fa-7x shopping-bag"></i>
                      )
                      
                    }
                </div>
        </div>
        </LoadingOverlay>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    cart:state.cart,
    isActive:state.isActive,
    selectedRestaurant:state.selectedRestaurant,
    isAuthenticated:state.isAuthenticated
  }
}
export default connect(mapStateToProps)(ShoppingCart)
