import React, { Component } from 'react'
import { connect } from 'react-redux';
import {closeConfirmResetModal, clearErrors, clearResetErrorMsgs} from '../../store/actions';
import './ConfirmTheResetModal.css';
import { FaCheckCircle } from 'react-icons/fa';
import Emoji from '../Emoji/Emoji';

export class ConfirmTheResetModal extends Component {

handleCloseModal = () => {
    this.props.dispatch(closeConfirmResetModal());
    this.props.dispatch(clearErrors());
    this.props.dispatch(clearResetErrorMsgs());
}

componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    window.addEventListener('click', this.handleOutsideClick, false);
}

componentDidUpdate() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    window.addEventListener('click', this.handleOutsideClick, false);
    window.onpopstate = (e) => {
    e.preventDefault();
    this.handleCloseModal();
    }
}

// Remove listeners immediately before a component is unmounted and destroyed.
componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    window.removeEventListener('click', this.handleOutsideClick, false);
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
    if(this.props.confirmRegistrationModal){
        if(e.target === this.node) {
            this.handleCloseModal();
        }
    }   
}

    render() {
        const{confirmResetModal} = this.props;
        return (
            <>
                {confirmResetModal === false ? (null):(
                <div ref={node => this.node = node} className="confirmRegistration_container">
                    <div  className="confirmRegistration__modal">
                        <div>
                        <FaCheckCircle className="checkTicMark"/>
                        </div>
                        <div className="confrimRegistration-content">
                            <Emoji symbol="👋" label="greetingHand"/> If there is an existing account with the email address you submitted, an email with a new password will be sent. 
                        </div>
                        <div className="confrimRegistration-btnContainer">
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
        confirmResetModal: state.confirmResetModal
    }
}
export default connect(mapStateToProps)(ConfirmTheResetModal)
