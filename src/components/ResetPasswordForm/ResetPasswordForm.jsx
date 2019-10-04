import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ResetPasswordForm.css';
import {closeResetPasswordModal, openSignUpModal} from '../../store/actions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { resetUserPassword, openConfirmResetModal, clearErrors} from '../../store/actions'



class ResetPasswordForm extends Component {


handleCloseModal = () => {
    this.props.dispatch(closeResetPasswordModal());
    this.props.dispatch(clearErrors());
}


componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    window.addEventListener('click', this.handleOutsideClick, false);
}

componentDidUpdate(prevProps) {
    const{passwordResetForm, successResetResponse, successResetResponseStatus} = this.props;
    window.addEventListener('keyup', this.handleKeyUp, false);
    window.addEventListener('click', this.handleOutsideClick, false);

// to close the modal when clicking on the browser back button
window.onpopstate = (e) => {
    e.preventDefault();
    this.handleCloseModal();
}

console.log('helloooo update outside')
// if the reseting is success close this modal and open the reset confirmation modal
if(passwordResetForm){
    if(successResetResponse === 'Your new password has been sent to your primary email address' && successResetResponseStatus === 200){
        this.handleCloseModal()
        this.props.dispatch(openConfirmResetModal())
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

handleOpenSignUpModal = () => {
    this.handleCloseModal();
    this.props.dispatch(openSignUpModal());
}

handleSubmit = (values,{props = this.props, setSubmitting}) => {
    props.dispatch(resetUserPassword(values.email));
    setSubmitting(false);
}

render() {
    const{passwordResetForm, failureResetResponse} = this.props;
    return (
        <>
                {passwordResetForm === false ? (null):(
                <div ref={node => this.node = node} className="resetModalContainer">
                        <div id="resetModal" className="text-capitalize">
                                <span onClick={this.handleCloseModal} className="close" title="Close Modal">&times;</span>
                                <div id="resetmodal__content" className="text-capitalize">
                                    <h3 className="modalcontainer__title">Reset Password</h3>
                                    {
                                        failureResetResponse === 'Something went wrong' || failureResetResponse === 'Email id does not exist' ? (
                                            <div className="resetMessage">
                                                {failureResetResponse}
                                            </div>
                                        ) : (null)

                                    }
                                    <Formik
                                        initialValues={{
                                            email:''
                                        }}
                                            //***********Using Yum for validation***********/
                                            validationSchema={Yup.object().shape({
                                                email: Yup.string()
                                                    .email()
                                                    .required("Requried")
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
                                                                    <label htmlFor="email"><b>Email</b></label>
                                                                    <input className="modalcontainer__input" 
                                                                            type="text" 
                                                                            placeholder="Enter your registered email" 
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
                                                                    <button className="signUpBtn modalcontainer__submit" type="submit" disabled={isSubmitting}>Send</button>
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
                                                        <button className="signUpBtn signup_newaccount" onClick={this.handleOpenSignUpModal} type="button">Go Back</button>
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
        passwordResetForm:state.passwordResetForm,
        successResetResponse:state.successResetResponse,
        successResetResponseStatus:state.successResetResponseStatus,
        failureResetResponse:state.failureResetResponse,
        failureResetResponseStatus:state.failureResetResponseStatus
    }
}

export default connect(mapStateToProps)(ResetPasswordForm)
