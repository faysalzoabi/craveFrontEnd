import React, { Component } from 'react'
import Switch from "react-switch";
import { connect } from 'react-redux';
import './DeliverySwitch.css';
import {toggleSwitch} from '../../store/actions';


export class DeliverySwitch extends Component {
constructor() {
    super();
    this.state = { checked: false };
  }

handleChange = () => {
  let {orderType} = this.props;
  let order = orderType === 3 ? 1 : 3;
  this.props.dispatch(toggleSwitch(order))
}
render() {
    return (
        <label>
            <span>{this.props.toggleSwitch ? (<h6 className="react-switch__Delivery">Delivery</h6>) : (<h6 className="react-switch__Pickup">Pickup</h6>)}</span>
            <Switch className="react-switch" onChange={this.handleChange} checked={this.props.toggleSwitch} />
        </label>
    )
}
}

const mapStateToProps = (state) => {
    return {
        toggleSwitch: state.toggleSwitch,
        orderType: state.orderType
    }
  }

  
export default connect(mapStateToProps)(DeliverySwitch)
