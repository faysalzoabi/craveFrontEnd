// import React from 'react'
import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { openCheckoutModal, logoutUser } from '../../store/actions';
import './Navbar.css';
import logo from '../../Images/logo.png';
import { connect } from 'react-redux'
import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap_white.css';
import DeliverySwitch  from '../DeliverySwitch/DeliverySwitch';
import ShoppingCartItems from '../ShoppingCartItems/ShoppingCartItems';

export class Navbar extends Component {

    handleOpenLoginForm = () => {
        this.props.dispatch(openCheckoutModal());
    }

    handleLoggingOut = () => {
        this.props.dispatch(logoutUser());
    }
    render() {
        const{isAuthenticated, user, selectedRestaurant, cart} = this.props;
        const text = (
            <div className="bagPopup">
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
                // <p> no items in your cart</p>
            )
            
            }

            </div>
            
        );
        const userName = (
            <li className="nav-item active mr-3">
                <span className="userName">Welcome, {user.fullName}</span>
            </li>
            )
        const logoutLinks = (
            <li className="nav-item active mr-3">
                <Link to='/' onClick={this.handleLoggingOut} className="btn btn-dark text-capitalize font-weight-bold nav-link px-4 mt-1">
                    Logout
                </Link>
            </li>
            )

        const loginLinks = (
            <li className="nav-item mr-3">
                < button onClick={this.handleOpenLoginForm} className="btn btn-dark text-capitalize font-weight-bold nav-link px-4 mt-1">
                    Login
                </button>
            </li>
            )
        
        const myAccount = (
            <li className="nav-item mr-3">
                < Link to='/account/myorder-history/' className="btn btn-dark text-capitalize font-weight-bold nav-link px-4 mt-1">
                    My Account
                </Link>
            </li>
        )
    
        return (
    <div className="wrapper">
        <nav className="navbar navbar-default fixed-top navbar-expand-sm justify-content-end wrapper">
                <Link to ="/" className="navbar-brand mr-auto">
                    <img src={logo} width="100" height="30" alt="crave logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                    <ul className="navbar-nav text-right">
                        {Object.keys(user).length !== 0 ? userName : ''}
                        {isAuthenticated ? (myAccount) : (null)}
                        {isAuthenticated ? (logoutLinks) : (loginLinks)}
                            <li className="nav-item shoppingCartIcon">
                                <Tooltip
                                    placement="bottomRight"
                                    overlay={text}
                                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                                    trigger={['click']}
                                    prefixCls='rctool'
                                >
                                    <i className="fas fa-shopping-bag fa-2x shopping-bag-fontawesome"></i>
                                </Tooltip>
                            </li>
                    </ul>
                </div>
        </nav>
    </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        cart:state.cart,
        isAuthenticated:state.isAuthenticated,
        user:state.user,
        selectedRestaurant:state.selectedRestaurant,
    }
}
export default connect(mapStateToProps)(Navbar)






