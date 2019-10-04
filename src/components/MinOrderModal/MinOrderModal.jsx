import React, { Component } from 'react'
import { connect } from 'react-redux';
import {closeMinOrderModal} from '../../store/actions';
import './MinOrderModal.css';
import { MdErrorOutline } from "react-icons/md";
import Emoji from '../Emoji/Emoji';

class MinOrderModal extends Component {

handleCloseModal = () => {
    this.props.dispatch(closeMinOrderModal());
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
    if(e.target === this.node){
        this.handleCloseModal();
        document.removeEventListener('click', this.handleOutsideClick, false);
    }
}

    render() {
        const{minOrderModal, selectedRestaurant} = this.props;
        return (
            <>
                {minOrderModal === false ? (null):(
                <div ref={node => this.node = node} className="minordermodal">
                    <div  className="minordermodal__container">
                        <div>
                        <MdErrorOutline className="errorMark"style={{color:'red', fontSize:'40px'}}/>
                        </div>
                        <div><Emoji symbol="👋" label="greetingHand"/> Sorry. Meet the delivery minimum of: <span style={{color:'#ff8000'}}>AED{selectedRestaurant.minPriceForHomeDelivery.toFixed(2)}</span> by adding
                        items to your order</div>
                        <div className="text-center">
                                <button onClick={this.handleCloseModal} type="button" className="btn btn-success modalButton mr-3">Add more items</button>
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
        minOrderModal:state.minOrderModal,
        selectedRestaurant:state.selectedRestaurant
    }
}

export default connect(mapStateToProps)(MinOrderModal)