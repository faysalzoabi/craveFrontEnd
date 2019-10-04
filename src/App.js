// import React from 'react';
import React, { Component } from 'react'
import './App.css';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantMenu from './pages/RestaurantMenu';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import About from './pages/About';
import MyOrders from './pages/MyOrders';
import PersonalInfo from './pages/PersonalInfo';
import OrderStatus from './pages/OrderStatus';
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Modal from './components/Modal/Modal';
import CheckoutModal from './components/CheckoutModal/CheckoutModal';
import ValidationUserAddressModal from './components/AddressModal/ValidationUserAddressModal';
import CustomizedModal from './components/CustomizedModal/CustomizedModal';
import MinOrderModal from './components/MinOrderModal/MinOrderModal';
import CitySearchModal from './components/CitySearchModal/CitySearchModal';
import  InvalidPromoCode  from './components/InvalidPromoCodeModal/InvalidPromoCode';
import SignUpForm from './components/SignUpForm/SignUpForm';
import { connect } from 'react-redux'
import ResetPasswordForm from './components/ResetPasswordForm/ResetPasswordForm';
import ConfirmRegistrationModal from './components/ConfirmRegistrationModal/ConfirmRegistrationModal';
import ConfirmResetModal from './components/ConfirmTheResetModal/ConfirmTheResetModal';
import ErrorModal from './components/ErrorModal/ErrorModal';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// function App() {
export class App extends Component {
  render() {
  return (
    <div className="App">
    <Navbar/>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/restaurants/" component={Restaurants}/>
        <Route exact path="/restaurants/:id/" component={RestaurantMenu}/>
        <ProtectedRoute exact path="/checkout/" component={Checkout}/>
        <Route exact path="/about/" component={About}/>
        <ProtectedRoute exact path="/account/myorder-history/" component={MyOrders}/>
        <ProtectedRoute exact path="/account/mydetails/" component={PersonalInfo}/>
        {this.props.placedOrderId && <ProtectedRoute exact path="/orderstatus/:orderId" component={OrderStatus}/>}
        {/* <Route exact path="/orderstatus/" component={OrderStatus}/> */}
        <Route component={Error}/>
    </Switch>
      <Modal/>
      {/* log in modal */}
      <CheckoutModal/>
      {/* adding user address modal */}
      <ValidationUserAddressModal/>
      {/* meal order ingredients checkbox customization modal */}
      <CustomizedModal/>
      <MinOrderModal/>
      <InvalidPromoCode/>
      <SignUpForm/>
      <ResetPasswordForm/>
      <ConfirmRegistrationModal/>
      <ConfirmResetModal/>
      <ErrorModal/>
      <CitySearchModal/>
    </div>
  );
  }
}

const mapStateToProps = (state) => {
  return {
      placedOrderId:state.placedOrderId
  }
}


export default connect(mapStateToProps)(App)


