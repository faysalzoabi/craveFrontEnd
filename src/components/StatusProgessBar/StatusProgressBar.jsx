// import React, { Component } from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import React from 'react';

export default function StatusProgressBar(props) {
    const {orderStatus, orderType} = props;
    return (
            <div className="orderstatus_progressbar">
                {
                    orderType === 3 ? (
                    <ProgressBar
                        percent={orderStatus === 1  ? (10) : (orderStatus === 2 ? (30) : (orderStatus === 3 ? (52) : (orderStatus === 4 ? (72) : (100))))}
                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                    />
                    ) : (
                    <ProgressBar
                        percent={orderStatus === 1  ? (13) : (orderStatus === 2 ? (38) : (orderStatus === 3 ? (70): (100)))}
                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                    />
                    )
                }
                
            </div>
    )
}


