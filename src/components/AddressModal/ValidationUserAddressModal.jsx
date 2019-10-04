import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {closeUserAddressModal, addNewAddress} from '../../store/actions';
import { connect } from 'react-redux';
import './AddressModal.css';
import GooglePlaceAutoComplete from '../GooglePlaceAutoComplete/GooglePlaceAutoComplete';

export class ValidationUserAddressModal extends React.Component {

    

state = {
    coordinates:[],
    suggest:''
    }

handleCloseModal = async () => {
    await this.props.dispatch(closeUserAddressModal());
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
    // document.removeEventListener('click', this.handleOutsideClick, false);
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
    if(e.target === this.node){
        this.handleCloseModal();
    }
}

handleSubmit = async (values, { props = this.props, setSubmitting }) => {
    const {coordinates,suggest} = this.state;
    await this.props.dispatch(addNewAddress(values, coordinates, suggest));
    setSubmitting(false);
}

handleSelectSuggest = (suggest,setFieldValue) => {
    setFieldValue('search','');
    setFieldValue('secondAddress', suggest.formatted_address)
    let lat,lng;
    if(suggest.geometry){
        lat = suggest.geometry.location.lat();
        lng = suggest.geometry.location.lng();
        this.setState({coordinates:[lat,lng], suggest:suggest.formatted_address})
    }
}

render() {
    const{userAddressModal} = this.props;
    return(
        <>
        {userAddressModal === false ? (null):(
        <div ref={node => this.node = node} className="addressmodal">
            <div ref={ele => this.ele = ele} className="addressmodal__container">
            <Formik
                initialValues={{
                    title:'',
                    search:'',
                    firstAddress:'',
                    secondAddress:'',
                }}
        
           //***********Using Yum for validation***********/
                validationSchema={Yup.object().shape({
                title: Yup
                    .string()
                    .min(2, 'Too Short!')
                    .max(50, 'Too Long!')
                    .required("Required"),
                firstAddress: Yup
                    .string()
                    .required("Address is required!"),
                secondAddress: Yup
                    .string()
                    .required("Second Address is required!"),
                landMark: Yup
                    .string()
                })}

        onSubmit={this.handleSubmit}
        // onSuggestHandle={this.handleSelectSuggest}
        render={
            formProps => {
                return(
                    <Form>
                    <label htmlFor="title">Flat/Office No</label>
                    <input 
                        type="text"     
                        name="title" 
                        placeholder="Enter your flat/office number..." 
                        value={formProps.values.title}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur('title')}
                        style={{
                            borderColor:
                            formProps.errors.title && formProps.touched.title && "red"
                        }}
                    /> 
                        {formProps.errors.title && formProps.touched.title && (
                        <div style={{ color: "red" }}>{formProps.errors.title}</div>
                        )}
                        
                        
                    <label htmlFor="firstAddress">Building/Community</label>
                    <input
                        type="text"     
                        name="firstAddress" 
                        placeholder="Enter Your Building/Community name..." 
                        value={formProps.values.firstAddress}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        style={{
                            borderColor:
                            formProps.errors.firstAddress && formProps.touched.firstAddress && "red"
                        }}
                    /> 
                        {formProps.errors.firstAddress && formProps.touched.firstAddress && (
                        <div style={{ color: "red" }}>{formProps.errors.firstAddress}</div>
                        )}

                        <label htmlFor="secondAddress">Address</label>
                        <GooglePlaceAutoComplete 
                        errors={formProps.errors.secondAddress} 
                        touch={formProps.touched.secondAddress} 
                        handleChange={(event) => {
                            formProps.setFieldValue('secondAddress',event.target.value);
                            formProps.setFieldValue('search',event.target.value);
                        }} 
                        handleBlur={formProps.handleBlur} 
                        secondAddress={formProps.values.secondAddress}
                        search={formProps.values.search}
                        handleSelectSuggest={(suggest) => this.handleSelectSuggest(suggest, formProps.setFieldValue)}
                        // onSelect={(val) => formProps.setFieldValue('value', val)}
                        />
                        <label htmlFor="landMark">landMark</label>
                        <input 
                        type="text" 
                        name="landMark" 
                        placeholder="Enter any landmark..." 
                        value={formProps.values.landMark}
                        onChange={formProps.handleChange}
                        onBlur={formProps.handleBlur}
                        style={{
                            borderColor:
                            formProps.errors.landMark && formProps.touched.landMark && "red"
                        }}
                                /> 
                        {formProps.errors.landMark && formProps.touched.landMark && (
                        <div style={{ color: "red" }}>{formProps.errors.landMark}</div>
                        )}
                        <button 
                        type="submit" 
                        className="btn btn-success modalButton mr-3"
                        disabled={formProps.isSubmitting}>
                            Submit
                        </button>
                    </Form>
                );
            }}
            />
            <div className="text-center">
                    <button onClick={this.handleCloseModal} type="button" className="btn btn-success modalButton mr-3">Cancel</button>
            </div>
        </div>
    </div>
        )
    }
        </>
    );
}
}

const mapStateToProps = (state) =>{
    return {
        userAddressModal:state.userAddressModal ,
        userGeoLocation:state.userGeoLocation
    }
}

export default connect(mapStateToProps)(ValidationUserAddressModal)