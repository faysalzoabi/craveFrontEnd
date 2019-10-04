import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchMyOrdersHistory, storeOrderId} from '../../store/actions';
import MyaccountOrderListItems from '../MyaccountOrderListItems/MyaccontOrderListitems';
import './MyaccountOrderList.css';
import {Link} from 'react-router-dom';


class MyaccountOrderList extends Component {

    componentDidMount(){
        this.props.dispatch(fetchMyOrdersHistory())
    }

    handleClick = (orderId) => {
        this.props.dispatch(storeOrderId(orderId))
    }

    render() {
        const{orderHistory} = this.props;
        return (
            <div className="orderlistcontents__container">
                {
                    orderHistory.length > 0 ? (
                        orderHistory.map((order) => {
                            return <Link  onClick={() => this.handleClick(order._id)} to={`/orderstatus/${order._id}`}> <MyaccountOrderListItems key={order._id} order={order}/> </Link> 
                        })
                    ) : (
                        <div className="orderlist__noitems">
                            <h4>There are no orders in your cart</h4>
                        </div>
                        
                    )
                    
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log('state history', state.orderHistory)
    return {
        orderHistory:state.orderHistory
    }
}
export default connect(mapStateToProps)(MyaccountOrderList)
