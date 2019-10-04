import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import './GoogleButton.css';
import { connect } from 'react-redux'
import {socialUserLogin} from '../../store/actions';

export class GoogleButton extends Component {
    
    responseGoogle = (response) => {
        const profileObj = response.profileObj;
        const {email, name} = profileObj;
        const socialId = response.googleId;
        let deviceToken = localStorage.getItem('notification-token') || '';
        const accountType = "Google";
        this.props.dispatch(socialUserLogin(email, name, socialId, deviceToken, accountType))
        } 

    render() {
        return (
            <>
                <GoogleLogin
                    clientId="491175858754-jo0iicqjup1or91que8fpv10bro26fh5.apps.googleusercontent.com" 
                    buttonText="Sign in with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    className="google-button"
                />

            </>
        )
    }
}

export default connect()(GoogleButton)

