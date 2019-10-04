import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CheckoutModal.css';
import {closeCheckoutModal, openSignUpModal, clearSignFailErrors, validateUserLogin} from '../../store/actions';
import GoogleButton from '../GoogleButton/GoogleButton';
import FacebookButton from '../FacebookButton/FacebookButton';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Seperator from '../Separator/Seperator';

export class CheckoutModal extends Component {


handleCloseModal = () => {
    this.props.dispatch(closeCheckoutModal());
    this.props.dispatch(clearSignFailErrors())
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
    if(e.target === this.node) {
        this.handleCloseModal();
    }
}

handleSubmit = (values,{props = this.props, setSubmitting}) => {
    let deviceToken = localStorage.getItem('notification-token') || '';
    props.dispatch(validateUserLogin(values.email, values.password, deviceToken));
    setSubmitting(false);

}

handleOpenSignupModal = () => {
    this.handleCloseModal();
    this.props.dispatch(openSignUpModal())
}

render() {
    const{checkoutModal, userLoginResponseStatus, userLoginResponse} = this.props;
    return (
        <>
                {checkoutModal === false ? (null):(
                <div ref={node => this.node = node} className="modalcontainer">
                        <div className="loginInContainer__modal">
                                <span onClick={this.handleCloseModal} className="close" title="Close Modal">&times;</span>
                                <div className="loginInContainer__content">
                                    <h3 className="modalcontainer__title">Login</h3>
                                    <GoogleButton/>   
                                    <FacebookButton/>
                                    <Seperator/>
                                    {
                                        userLoginResponseStatus === 409 || userLoginResponseStatus === 404 ? (
                                            <div className="loginNotification">
                                                    {userLoginResponse}
                                            </div>
                                        ) : (null)
                                    }
                                    <Formik
                                        initialValues={{
                                            email:'',
                                            password:'',
                                        }}

                                            //***********Using Yum for validation***********/
                                            validationSchema={Yup.object().shape({
                                                email: Yup.string()
                                                    .email()
                                                    .required("Requried"),
                                                password:Yup.string()
                                                    .required("No password provided")
                                                    .min(6,"Should be 6 chars minimum ")
                                                    .matches(/(?=.*[0-9])/, "Password must contain a number")
                                            })}
                                            onSubmit={this.handleSubmit}
                                            render={
                                                props => {
                                                    const{
                                                        values,
                                                        touched,
                                                        errors,
                                                        isSubmitting,
                                                        handleChange,
                                                        handleBlur,
                                                        handleSubmit
                                                    } = props;
                                                    return(
                                                            <div className="logincontainer__form">
                                                                <Form>
                                                                    <label htmlFor="email"><b>Email</b></label>
                                                                    <input className="modalcontainer__input" 
                                                                            type="text" 
                                                                            placeholder="Enter your email" 
                                                                            name="email" 
                                                                            value={values.email}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            style={{
                                                                                borderColor:
                                                                                errors.email && touched.email && "red"
                                                                            }}
                                                                            required
                                                                            />
                                                                            {errors.email && touched.email && (
                                                                                <div className="inputFeedback">{errors.email}</div>
                                                                            )}
                                                                    
                                                                    <label htmlFor="password"><b>Password</b></label>
                                                                    <input className="modalcontainer__input" 
                                                                            type="password" 
                                                                            placeholder="Enter password" 
                                                                            name="password" 
                                                                            value={values.password}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            style={{
                                                                                borderColor:
                                                                                errors.password && touched.password && "red"
                                                                            }}
                                                                            required
                                                                            />
                                                                            {errors.password && touched.password && (
                                                                                <div className="inputFeedback">{errors.password}</div>
                                                                            )}
                                                                    
                                                                    <label>
                                                                        {/* <input type="checkbox" checked="checked" name="remember"/> Remember me */}
                                                                    </label>
                                                                    <button className="modalcontainer__submit" type="submit" disabled={isSubmitting}>Login</button>
                                                                    
                                                                </Form>
                                                            </div>
                                                        )
                                                    }
                                                    }
                                                />
                                                        <div className="createAccount">
                                                            <button onClick={this.handleOpenSignupModal} type="button" className="btnBlue">Create an account</button>
                                                        </div>
                            
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
        checkoutModal:state.checkoutModal,
        userLoginResponse:state.userLoginResponse,
        userLoginResponseStatus:state.userLoginResponseStatus
    }
}

export default connect(mapStateToProps)(CheckoutModal)
