import React, { Component } from 'react'
import { connect } from 'react-redux';
import {closeErrorModal} from '../../store/actions';
import { MdError } from "react-icons/md";

export class ErrorModal extends Component {

handleCloseModal = () => {
    this.props.dispatch(closeErrorModal());
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
        const{errorModalOpen} = this.props;
        return (
            <>
                {errorModalOpen === false ? (null):(
                <div ref={node => this.node = node} className="custommodal">
                    <div   className="custommodal__container">
                        <div>
                        <MdError className="warningTickMark"/>
                        </div>
                        <h5>Sorry we can't process this request right now</h5>
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
        errorModalOpen:state.errorModalOpen
    }
}
export default connect(mapStateToProps)(ErrorModal)