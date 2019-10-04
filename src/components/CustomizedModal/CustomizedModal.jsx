import React, { Component } from 'react'
import { connect } from 'react-redux';
import {closeCustomizationModal} from '../../store/actions';
import './CustomizedModal.css';
import { MdError } from "react-icons/md";
import Emoji from '../Emoji/Emoji';

export class CustomizedModal extends Component {

handleCloseModal = () => {
    this.props.dispatch(closeCustomizationModal());
}

componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
}

componentDidUpdate() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
    window.onpopstate = (e) => {
    e.preventDefault();
    this.handleCloseModal();
    }
}

// Remove listeners immediately before a component is unmounted and destroyed.
componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
}


handleKeyUp = (e) => {
    const keys = {
    27: () => {
        e.preventDefault();
        console.log('esc',this);
        this.handleCloseModal();
        window.removeEventListener('keyup', this.handleKeyUp, false);
    },
};
if (keys[e.keyCode]) { keys[e.keyCode](); }
}


handleOutsideClick = (e) => {
    if(this.props.placeOrderStatus && this.node === e.target)
            this.handleCloseModal();
}

    render() {
        const{placeOrderStatus} = this.props;
        return (
            <>
                {placeOrderStatus === false ? (null):(
                <div ref={node => this.node = node} className="custommodal">
                    <div   className="custommodal__container">
                        <div>
                        <MdError className="warningTickMark"/>
                        </div>
                        <h5><Emoji symbol="👋" label="greetingHand"/> Cant Deliver. The restaurant too far</h5>
                        <div className="text-center">
                                <button onClick={this.handleCloseModal} type="button" className="btn btn-success modalButton mr-3">Close</button>
                        </div>
                    </div> 
                </div>
                )}
            </>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        placeOrderStatus:state.placeOrderStatus
    }
}
export default connect(mapStateToProps)(CustomizedModal)
