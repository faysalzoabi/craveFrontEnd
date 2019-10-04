// import React from 'react'
import './FacebookButton.css';
import { FaFacebookF } from 'react-icons/fa';
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { FacebookProvider, Login } from 'react-facebook';
import {socialUserLogin} from '../../store/actions';

export class FacebookButton extends Component {

handleResponse = (data) => {
    const profileObj = data.profile;
    const {email,name,id} = profileObj;
    let deviceToken = localStorage.getItem('notification-token') || '';
    const accountType = "Facebook";
    this.props.dispatch(socialUserLogin(email, name, id, deviceToken, accountType));
    }

    
render() {
    const {isAuthenticated} = this.props;
    let fbContent;
    if(isAuthenticated){
        fbContent = (
            <button className="facebook-button">
                    <div className="facebook-button__icon"><FaFacebookF/></div><span className="facebook-button__text">Sign in with facebook</span>   
            </button>
        );
    } else {
        fbContent = (
            <FacebookProvider appId="522896538216713">
                <Login
                scope="email"
                onCompleted={this.handleResponse}
                onError={this.handleError}
                >
                {({ loading, handleClick, error, data }) => (
                    <button className="facebook-button" onClick={handleClick}>
                        <span className="facebook-button__icon"><FaFacebookF/></span><span className="facebook-button__text">Sign in with facebook</span>   
                    </button>
                )}
                </Login>
            </FacebookProvider>
        )
    }
    return (
        <div className="fbButtonContainer">
            {fbContent}
        </div>
    )
}

}
const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(FacebookButton)
