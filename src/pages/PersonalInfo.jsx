// import React, { Component } from 'react';
import Showcase from '../components/Showcase/Showcase';
import MyaccountList from '../components/MyaccountList/MyaccountList';
import PersonalInfoForm from '../components/PersonalInfoForm/PersonalInfoForm';
// import './PersonalInfo.css';
import HomeToMYAccountPath from '../components/HomeToMyAccountPath/HomeToMyAccountPath';

import React from 'react'

export default function PersonalInfo() {
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
                            <PersonalInfoForm/>
                        </div>
                    </div>
                    </section>
                </div>
        </div>
    )
}

