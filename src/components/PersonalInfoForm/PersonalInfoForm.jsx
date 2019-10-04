import React, { Component } from 'react'
import './PersonalInfoForm.css';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {updatingUserProfile} from '../../store/actions';
import { FaCheck } from "react-icons/fa";
import {clearUserProfileResponse} from '../../store/actions';
export class PersonalInfoForm extends Component {

    componentDidMount(){
        this.props.dispatch(clearUserProfileResponse())
    }

    handleChange = (e) => {
        this.props.dispatch()
    }

    handleSubmit = (values,{props = this.props, setSubmitting, resetForm}) => {
        console.log('values', values)
        this.props.dispatch(updatingUserProfile(values.name, values.mobile));
        setSubmitting(false);
    }
    
    render() {
        const{updateProfileResponse} = this.props;
        return (
            <div className="formContainer">
                                <div className="errorMsgContainer">
                                    {
                                        updateProfileResponse.responseCode === 204 && updateProfileResponse.responseMessage === "Phone number already taken" ? (
                                            <p className="formErrorMessage">Phone number is already taken</p>
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                                <Formik
                                        initialValues={{
                                            name:this.props.user.fullName || '',
                                            mobile:('0' + this.props.user.phoneNumber) || '',
                                        }}

                                            //***********Using Yum for validation***********/
                                            validationSchema={Yup.object().shape({
                                                name: Yup.string()
                                                    .required("Requried"),
                                                mobile:Yup.string()
                                                    .required("Requried")
                                                    .matches(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/, 'Phone number is invalid'),
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
                                                    } = props;
                                                    return(     
                                                                <Form className="formContents">
                                                                    <label htmlFor="email">
                                                                    <span className="labelTitle">Email</span>
                                                                    <input className="personalFormInput notallowed"
                                                                            type="email" 
                                                                            placeholder="Enter your email" 
                                                                            name="email" 
                                                                            value={this.props.user.emailId}
                                                                            onBlur={handleBlur}
                                                                            disabled
                                                                            />
                                                                    </label>

                                                                    <label htmlFor="name">
                                                                    <span className="labelTitle">Name</span>
                                                                    <input className="personalFormInput" 
                                                                            type="text" 
                                                                            placeholder="Enter name..." 
                                                                            name="name" 
                                                                            value={values.name}
                                                                            // value={this.props.user.name}
                                                                            onChange={handleChange}
                                                                            // onChange={this.handleChange}
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
                                                                    </label>

                                                                    <label htmlFor="mobile">
                                                                    <span className="labelTitle">Mobile Number</span>
                                                                    <input className="personalFormInput" 
                                                                            type="tel" 
                                                                            placeholder="Enter Mobile Number..." 
                                                                            name="mobile" 
                                                                            value={values.mobile}
                                                                            // value={this.props.user.phoneNumber}
                                                                            onChange={handleChange}
                                                                            // onChange={this.handleChange}
                                                                            onBlur={handleBlur}
                                                                            style={{
                                                                                borderColor:
                                                                                errors.mobile && touched.mobile && "red"
                                                                            }}
                                                                            required
                                                                            />
                                                                            {errors.mobile && touched.mobile && (
                                                                                <div className="inputFeedback">{errors.mobile}</div>
                                                                            )}
                                                                    </label>
                                                                    <button className="updateForm" type="submit" disabled={isSubmitting}>
                                                                        {updateProfileResponse.responseMessage === "Profile updated" && <FaCheck className="checkMark"/>}
                                                                        {updateProfileResponse.responseMessage === "Profile updated" && <span>Updated Successfully</span> }
                                                                        {(updateProfileResponse.responseMessage === "Phone number already taken" || Object.keys(updateProfileResponse).length === 0) && <span>Update</span> }
                                                                    </button>
                                                                </Form>
                                                        )
                                                    }
                                            }
                                />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return{
        user:state.user,
        updateProfileResponse:state.updateProfileResponse
    }
}
export default connect(mapStateToProps)(PersonalInfoForm)
