import React, { Component } from 'react'
import './OrderStatus.css';
import Showcase from '../components/Showcase/Showcase';
import { connect } from 'react-redux'
import {fetchOrderStatusDetails} from '../store/actions';
import './OrderStatus.css';
import StatusProgressBar from '../components/StatusProgessBar/StatusProgressBar';
import FinalOrderTable from '../components/FinalOrderTable/FinalOrderTable';
import Shimmer from '../components/Shimmer/Shimmer';
import FinalOrderTotalAmountTable from '../components/FinalOrderTotalAmountTable/FinalOrderTotalAmountTable';
import {Link} from 'react-router-dom';
export class OrderStatus extends Component {

state = {
    status:true,
    count:0
}

componentDidMount(){
        this.interval = setInterval(() => {
            this.setState({ count: this.state.count + 1});
            if(this.state.count === 4){
                clearInterval(this.interval);
            }
        }, 3000);
    this.props.dispatch(fetchOrderStatusDetails(this.props.placedOrderId))
}

componentDidUpdate(){
    window.onpopstate = (e) => {
        this.props.history.push('/restaurants');
    }
}

componentWillUnmount() {
    clearInterval(this.interval);
    }


render() {
    const {orderType, finalPlacedOrder, promoCodeResObj, selectedRestaurant} = this.props;
    let imageUrl = 'https://api.craveuae.ae:8087/';
    return (
        <div>
            <Showcase/>
            {
                (Object.entries(finalPlacedOrder).length === 0 && finalPlacedOrder.constructor === Object) || typeof finalPlacedOrder === 'undefined' ? (
                    <div className="shimmercontainer"> <Shimmer/> </div>
                ) : (
                <div className="orderstatus_container">
                    <div className="orderstatus_contents">
                        <div className="orderstatus_card">
                            <div className="orderstatus_cardtitle">
                                <div className="orderstatus_cardimg">
                                    {
                                        Object.keys(selectedRestaurant).length === 0 && selectedRestaurant.constructor === Object ? (
                                            <img src={imageUrl + finalPlacedOrder.restaurantId[0].image[0]} alt="restaurantPicture"/>
                                        ) : (
                                            <img src={imageUrl + selectedRestaurant.image[0]} alt="restaurantPicture"/>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="orderstatus_progressbar">
                                <div className="orderstatus_progressbar_title">
                                    <h4>Track Your Order</h4>
                                </div>
                                    <StatusProgressBar orderStatus={finalPlacedOrder.orderStatus} orderType={orderType}/>
                                    {orderType === 3 ? (
                                        <ul className="orderstatus_steps">
                                            <li className={"stepsitem " +  (finalPlacedOrder.orderStatus === 1 ? 'highlightstatus' : 'grayedstatus')}>1. Pending</li>
                                            <li className={"stepsitem " +  (finalPlacedOrder.orderStatus === 2 ? 'highlightstatus' : 'grayedstatus')}>2. Confirmed</li>
                                            <li className={"stepsitem " +  (finalPlacedOrder.orderStatus === 3 ? 'highlightstatus' : 'grayedstatus')}>3. Cooking</li>
                                            <li className={"stepsitem " +  (finalPlacedOrder.orderStatus === 4 ? 'highlightstatus' : 'grayedstatus')}>4. On The way</li>
                                            <li className={"stepsitem " +  (finalPlacedOrder.orderStatus === 5 ? 'highlightstatus' : 'grayedstatus')}>5. Delivered</li>
                                        </ul>
                                    ) : (
                                        <ul className="orderstatus_steps">
                                            <li className={"stepsitem " +  (finalPlacedOrder.orderStatus === 1 ? 'highlightstatus' : 'grayedstatus')}>1. Pending</li>
                                            <li className={"stepsitem " +  (finalPlacedOrder.orderStatus === 2 ? 'highlightstatus' : 'grayedstatus')}>2. Confirmed</li>
                                            <li className={"stepsitem " +  (finalPlacedOrder.orderStatus === 3 ? 'highlightstatus' : 'grayedstatus')}>3. Cooking</li>
                                            <li className={"stepsitem " +  (finalPlacedOrder.orderStatus === 4 ? 'highlightstatus' : 'grayedstatus')}>4. Picked</li>
                                        </ul>
                                        )}
                            </div>
                        </div>
                        <div className="orderstatus_tables">
                        <FinalOrderTable products={finalPlacedOrder.products}/>
                            {
                                Object.entries(promoCodeResObj).length !== 0 && promoCodeResObj.constructor === Object ? (
                                    <FinalOrderTotalAmountTable  
                                    paymentAmount={promoCodeResObj.updatedPrice + finalPlacedOrder.deliveryCharge} 
                                    orderId={finalPlacedOrder.orderId} 
                                    createdAt={finalPlacedOrder.createdAt}  
                                    avgDeliveryTime={finalPlacedOrder.avgDeliveryTime} 
                                    />
                                ) : (
                                    <FinalOrderTotalAmountTable  
                                    paymentAmount={finalPlacedOrder.payAmount + finalPlacedOrder.deliveryCharge} 
                                    orderId={finalPlacedOrder.orderId} 
                                    createdAt={finalPlacedOrder.createdAt}
                                    avgDeliveryTime={finalPlacedOrder.avgDeliveryTime} 
                                    />
                                )
                                
                                }
                        </div>
                    </div>
                    <div className="homeButton">
                        <Link to ='/' className="orderbutton">Go to Homepage</Link>
                    </div>
                </div>
                )
            }
        </div>
    )
}
}

const mapStateToProps = (state) => {
    console.log('in order status comp', state.placedOrderId);
    console.log('in order status comp finalplaceorder', state.finalPlacedOrder);
    console.log('in order status comp finalplaceorder products', state.finalPlacedOrder.products);
    return {
        placedOrderId:state.placedOrderId,
        finalPlacedOrder:state.finalPlacedOrder,
        orderType:state.orderType,
        promoCodeResObj:state.promoCodeResObj,
        selectedRestaurant:state.selectedRestaurant
    }
}
export default connect(mapStateToProps)(OrderStatus)
