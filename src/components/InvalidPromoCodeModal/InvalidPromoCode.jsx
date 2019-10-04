import React, { Component } from 'react'
import { connect } from 'react-redux';
import {resetInvalidPromoCode} from '../../store/actions';
import './InvalidPromoCode.css';
import { MdError } from "react-icons/md";
import Emoji from '../Emoji/Emoji';

export class InvalidPromoCode extends Component {

handleCloseModal = () => {
    console.log('closing');
    this.props.dispatch(resetInvalidPromoCode());
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
    if(this.props.placeOrderStatus){
    if(!this.node.contains(e.target)){
        this.handleCloseModal();
        document.removeEventListener('click', this.handleOutsideClick, false);
    }
    }   
}

    render() {
        const{promoModal} = this.props;
        return (
            <>
                {promoModal === false ? (null):(
                <div className="custommodal">
                    <div  ref={node => this.node = node} className="custommodal__container">
                        <div>
                        <MdError className="warningTickMark"/>
                        </div>
                        <h5><Emoji symbol="👋" label="greetingHand"/> {this.props.invalidPromo}</h5>
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
        promoModal:state.promoModal,
        invalidPromo:state.invalidPromo
    }
}
export default connect(mapStateToProps)(InvalidPromoCode)
