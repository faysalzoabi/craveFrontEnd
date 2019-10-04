
import { connect } from 'react-redux';
import './ProductCard.css';
import {openModal} from '../../store/actions';
import { IoIosAddCircle } from "react-icons/io";
import {addItemsToCart, addImage, openCheckoutModal, updateProductQuantity} from '../../store/actions';
import craveLogo from '../../Images/crave_default_logo.png'



import React from 'react'

function ProductCard(props) {

    function handleAddingToCart (selectedRestaurantId,selectedMenuId,productId,image) {
        const {isAuthenticated, cart} = props;
        if(isAuthenticated){
            if(typeof cart.list !== 'undefined' && cart.list.length > 0){
                let selectedCartItem = cart.list.find(item => item.productId._id === productId);
                if(selectedCartItem) {
                    let updatedQuantity = selectedCartItem.quantity + 1;
                    props.dispatch(updateProductQuantity(selectedCartItem._id, updatedQuantity));
                } else {
                    props.dispatch(addItemsToCart(selectedRestaurantId,selectedMenuId,productId));
                    props.dispatch(addImage(image));
                }
            } else {
                    props.dispatch(addItemsToCart(selectedRestaurantId,selectedMenuId,productId));
                    props.dispatch(addImage(image));
            }
        
        } else {
                    props.dispatch(openCheckoutModal())
        }
        
    }

    function handleOpeningModal(id){
        const {isAuthenticated} = props;
        if(isAuthenticated){
            props.dispatch(openModal(id))
        } else {
            props.dispatch(openCheckoutModal())
            }
        }

    const{product, selectedRestaurant, selectedMenu} = props;
    let imageUrl = 'https://api.craveuae.ae:8087/';
    return (
        <div className="productcard" style={{minWidth:'350px', minHeight:'95px'}}>
        <div className="productcard-container">
            <div className="productcard-image">
                {
                    product.image[0] ? (
                        <img src={imageUrl + product.image[0]}  className="card-img" alt=""/>
                    ) : (
                        <img src={craveLogo}  style={{objectFit:'contain'}} className="card-img" alt=""/>
                    )
                }
                
            </div>
            <div className="productcard-body">
                <div className="productcard-text">
                    <h5 className="productcard-title">{product.name}</h5>
                    <p className="productcard-subtitle mb-4">
                        {product.description}
                    </p>
                </div>
            </div>
            <div className="postcard-price">
                    {product.price === 0 ? ('Price on selection') : (`AED ${product.price}`)}
            </div>
            <div className='pluscircle'>
                    {product.customizable ? (
                        <IoIosAddCircle name="faplus" id="faplus" onClick={() => handleOpeningModal(product._id)} className="faplus"/>
                        // <button onClick={() => this.handleOpeningModal(product._id)} style={{width:'2rem', height:'2rem'}}>Add</button>
                    ) : (
                        <IoIosAddCircle onClick={() => handleAddingToCart(selectedRestaurant._id,selectedMenu,product._id,product.image[0])} className="faplus"/>
                    )
                    }
            </div>
        </div> 
    </div>
    )
}


export default connect()(ProductCard)
