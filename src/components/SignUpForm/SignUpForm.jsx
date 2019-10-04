import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SignUpForm.css';
import {closeSignUpModal, openCheckoutModal} from '../../store/actions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { registerNewUser, openResetPasswordModal, clearErrors, openConfirmRegistrationModal } from '../../store/actions'
export class SignUpForm extends Component {

// close sign up modal
handleCloseModal = () => {
    this.props.dispatch(closeSignUpModal());
    this.props.dispatch(clearErrors())
}

// opening the confirmation registration modal
handleOpenConfirmRegistrationModal = () => {
    this.props.dispatch(openConfirmRegistrationModal())
}

componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    window.addEventListener('click', this.handleOutsideClick, false);
}

componentDidUpdate(prevProps) {
    const {isAuthenticated, signUpModal, userRegistrationResponse} = this.props;
    window.addEventListener('keyup', this.handleKeyUp, false);
    window.addEventListener('click', this.handleOutsideClick, false);
    window.onpopstate = (e) => {
    e.preventDefault();
    this.handleCloseModal();
}

// if authenticated close modal
if(signUpModal){
    if(isAuthenticated && userRegistrationResponse === "Account created"){
        this.handleCloseModal()
        this.handleOpenConfirmRegistrationModal()
    }
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

handleOpenLoginModal = () => {
    this.handleCloseModal();
    this.props.dispatch(openCheckoutModal());
}

handleResetPasswordModal = () => {
    this.props.dispatch(closeSignUpModal());
    this.props.dispatch(openResetPasswordModal())
}

handleSubmit = (values,{props = this.props, setSubmitting}) => {
    let deviceToken = localStorage.getItem('notification-token');
    props.dispatch(registerNewUser(values.name, values.email, values.password, values.phone, deviceToken));
    setSubmitting(false);
}

render() {
    const{signUpModal, userRegistrationResponse} = this.props;
    return (
        <>
                {signUpModal === false ? (null):(
                <div ref={node => this.node = node} className="modalcontainer">
                        <div id="modalcontainer__modal" className="text-capitalize">
                                <span onClick={this.handleCloseModal} className="close" title="Close Modal">&times;</span>
                                <div id="modalcontainer__content" className="text-capitalize">
                                    <h3 className="modalcontainer__title">Register</h3>
                                    {
                                        userRegistrationResponse === 'Email id already taken' ? (
                                            <div className="signupNotification">
                                                    An account with that username (email address) already exists. 
                                                    Click <span onClick={this.handleResetPasswordModal} className="signupform_reset">here</span> to retrieve the password in case you forgot it.
                                            </div>
                                        ) : (null)
                                    }
                                    <Formik
                                        initialValues={{
                                            name:'',
                                            email:'',
                                            phone:'',
                                            password:'',
                                            confirmPassword:''
                                        }}
                                            //***********Using Yum for validation***********/
                                            validationSchema={Yup.object().shape({
                                                name: Yup.string()
                                                    .required("Required"),
                                                email: Yup.string()
                                                    .email()
                                                    .required("Requried"),
                                                phone:Yup.string()
                                                    .matches(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/, 'Phone number is invalid'),
                                                password:Yup.string()
                                                    .required("No password provided")
                                                    .min(6,"Should be 6 chars minimum ")
                                                    .matches(/(?=.*[0-9])/, "Password must contain a number"),
                                                confirmPassword:Yup.string()
                                                    .required("No password provided")
                                                    .test('passwords-match', 'Sorry passwords does not match', function(value) {
                                                        return this.parent.password === value;
                                                    })
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
                                                            <div className="modalcontainer__form">
                                                                <Form>
                                                                    <label htmlFor="name"><b>Name</b></label>
                                                                    <input className="modalcontainer__input" 
                                                                            type="text" 
                                                                            placeholder="Enter your name" 
                                                                            name="name" 
                                                                            value={values.name}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            style={{
                                                                                borderColor:
                                                                                errors.name && touched.name && "red"
                                                                            }}
                                                                            required
                                                                            />
                                                                            {errors.name && touched.name && (
                                                                                <div className="inputFeedback">{errors.name}</div>
                                                                            )}

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

                                                                    <label htmlFor="email"><b>Phone</b></label>
                                                                    <input className="modalcontainer__input" 
                                                                            type="tel" 
                                                                            placeholder="Enter your phone number" 
                                                                            name="phone" 
                                                                            value={values.phone}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            style={{
                                                                                borderColor:
                                                                                errors.phone && touched.phone && "red"
                                                                            }}
                                                                            />
                                                                            {errors.phone && touched.phone && (
                                                                                <div className="inputFeedback">{errors.phone}</div>
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

                                                                    <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
                                                                    <input className="modalcontainer__input" 
                                                                            type="password" 
                                                                            placeholder="confirm the password" 
                                                                            name="confirmPassword" 
                                                                            value={values.confirmPassword}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            style={{
                                                                                borderColor:
                                                                                errors.confirmPassword && touched.confirmPassword && "red"
                                                                            }}
                                                                            required
                                                                            />
                                                                            {errors.confirmPassword && touched.confirmPassword && (
                                                                                <div className="inputFeedback">{errors.confirmPassword}</div>
                                                                            )}
                            
                                                                    <button className="signUpBtn modalcontainer__submit" type="submit" disabled={isSubmitting}>Register</button>
                                                                </Form>
                                                            </div>
                                                        )
                                                    }
                                                    }
                                                />
                                                        {/* <div className="text-center">
                                                            <button onClick={this.handleCloseModal} type="button" className="btn btn-success modalButton mr-3">Cancel</button>
                                                        </div> */}

                                                        <div className="signup_newaccount_container">
                                                            <button className="signUpBtn signup_newaccount" onClick={this.handleOpenLoginModal} type="button">I have an account</button>
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
        signUpModal:state.signUpModal,
        userRegistrationResponse:state.userRegistrationResponse,
        isAuthenticated:state.isAuthenticated,
        error:state.error
    }
}

export default connect(mapStateToProps)(SignUpForm)
