import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from "react-icons/io";
import { connect } from 'react-redux';
import {deleteProductItem, updateProductQuantity} from '../../store/actions';
import './ShoppingCartDetails.css';


function ShoppingCartDetails(props) {

  function handleDelete(cartId){
    props.dispatch(deleteProductItem(cartId))
}

  function handleAddingQuantity(cartId, quantity){
  let increasedQuantityCount = quantity + 1;
    handleItemQuantity(cartId, increasedQuantityCount)

}

  function handleSubQuantity(cartId, quantity){
  if(typeof quantity !== 'undefined' && quantity > 1){
    let decrementedQuantityCount = quantity - 1;
    handleItemQuantity(cartId, decrementedQuantityCount)
  }
  
}

  function handleItemQuantity(cartId, quantityCount){
    props.dispatch(updateProductQuantity(cartId, quantityCount));
}

  const {item} = props;
  return (
    <div className="itemcontainer">
        <span className="itemcontainer__productname">{item.productId.name}</span>
        <div className="buttonscontainer">
            <IoIosRemoveCircleOutline className="facounter" onClick={() => handleSubQuantity(item._id, item.quantity)} />
                <span className="itemquantity">{item.quantity}</span>
            <IoIosAddCircleOutline className="facounter" onClick={() => handleAddingQuantity(item._id, item.quantity)} />
        </div>
        <span className="itemcontainer__prodprice">{item.price.toFixed(2)}</span>
        <FaTrashAlt className="fadelete" onClick={() => handleDelete(item._id)}/>
    </div>
  )
}


export default connect()(ShoppingCartDetails)
