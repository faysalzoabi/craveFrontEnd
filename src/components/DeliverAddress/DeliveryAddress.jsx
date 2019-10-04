import React, { Component } from 'react'
import './DeliveryAddress.css';
import { connect } from 'react-redux';
import {fetchUserAddress, chooseUserAddress, openUserAddressModal, deleteUserAddress} from '../../store/actions';
import DeliverySwitch from '../DeliverySwitch/DeliverySwitch';
import { FaTrashAlt } from 'react-icons/fa';
export class DeliveryAddress extends Component {

    state = {
        selectedRadioBtn : '',
    }
handleChange = (event, item) => {
    // this.setState({
    //     selectedRadioBtn: item.title     //! need to look at this
    // })
    this.props.dispatch(chooseUserAddress(item))
}

handleClick = () => {
    this.props.dispatch(openUserAddressModal());
}

handleAddressDelete = (addressId) => {
    this.props.dispatch(deleteUserAddress(addressId));
}

componentDidMount() {
    this.props.dispatch(fetchUserAddress())
}

    render() {
        const {customerAddress} = this.props;
        return (
            <div className="checkout__delivery">
                <div className="checkout__deliveryswitch">
                    <DeliverySwitch/>
                </div>
                {
                    customerAddress.length === 0 ? (
                    <div className="checkout__delivery__inputcontainer">
                        <p>You don't have a registered address in our system</p>
                    </div>
                    ) : (
                        customerAddress.map((item, index) => (
                            <div key={index} className="checkout__label__container">
                                <label  className="checkout__label">
                                    <input 
                                    className="checkout__radiobtn" 
                                    type="radio" 
                                    value={item.title}
                                    checked={this.state.selectedRadioBtn === item.title}
                                    onChange={(event) => this.handleChange(event,item)}
                                    />
                                    {item.address.length > 50 ? (item.address.slice(0,50) + " ...") : (item.address)}
                                </label>
                                <FaTrashAlt onClick={() => this.handleAddressDelete(item._id)} style={{color:'red', cursor:'pointer'}}/>
                            </div>
                        )
                    ) 
                    )
                }
                <div className="checkout__btn__container">
                    <button name="addressbtn" onClick={this.handleClick} className="checkoutout__address__btn">Add New Address</button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        customerAddress: state.customerAddress
    }
}

export default connect(mapStateToProps)(DeliveryAddress)
