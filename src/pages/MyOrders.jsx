// import React, { Component } from 'react';
import React from 'react';
import Showcase from '../components/Showcase/Showcase';
import MyaccountList from '../components/MyaccountList/MyaccountList';
import MyaccountOrderList from '../components/MyaccountOrderList/MyaccountOrderList';
import './MyOrders.css';
import HomeToMYAccountPath from '../components/HomeToMyAccountPath/HomeToMyAccountPath';

export default function MyOrders() {
    return (
        <div>
            <Showcase/>
                <div className="orderList__wrapper">
                    <div className="orderlist__topbanner"></div>
                    <section className="orderList__container">
                    <HomeToMYAccountPath/>
                        <div className="orderList__contents">   
                            <div className="orderList__menu">
                                <MyaccountList/>
                            </div>
                            <div className="orderList__orderContents">
                                <MyaccountOrderList/>
                            </div>
                        </div>
                    </section>
                </div>
        </div>
    )
}

