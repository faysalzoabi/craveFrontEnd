import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Modal.css';
import {closeModal} from '../../store/actions';
import CustomizationOptions from '../CustomizationOptions/CustomizationOptions';
import { FaShoppingBag } from 'react-icons/fa';
import {addItemsToCart, activateRedTickMark, clearTickMarks, clearIngredientsItemsArray} from '../../store/actions';

export class Modal extends Component {

handleCloseModal = () => {
    this.props.dispatch(clearIngredientsItemsArray())
    this.props.dispatch(clearTickMarks())
    this.props.dispatch(closeModal());
    
}

componentDidMount() {
  window.addEventListener('keyup', this.handleKeyUp, false);
  document.addEventListener('click', this.handleOutsideClick, false);
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
        console.log('esc',this);
        this.handleCloseModal();  
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
};
if (keys[e.keyCode]) { keys[e.keyCode](); }
}

handleOutsideClick = (e) => {
  if(this.props.modalOpen && this.modalNode === e.target){
    this.handleCloseModal();
  }
          
}

handleClick = (restaurantId,selectedMenuId,modalProductId) => {
    const{modalProduct, radioBtnGroupName, ingredientsIdWithExceededLimit} = this.props;
    //finding the radio buttons group names that are not selected
    let notSelectedGroupTitleArray = modalProduct.ingridients
                        .filter(ingredient => ingredient.type === 1)
                        .map(item => item.name)
                        .filter(elem => !radioBtnGroupName.includes(elem));
  
    
    //activate the red tick mark for the group names that their radio buttons are not selected
    if(notSelectedGroupTitleArray.length > 0) {
      this.props.dispatch(activateRedTickMark(notSelectedGroupTitleArray));
      return;
    }

    if(ingredientsIdWithExceededLimit.length > 0) {
      return;
    }

    this.props.dispatch(addItemsToCart(restaurantId,selectedMenuId,modalProductId));
    this.props.dispatch(closeModal());

}

  render() {
    const {modalOpen, modalProduct, selectedRestaurant,selectedMenu} = this.props;
    return (
        <div>
        {modalOpen === false ? (null):(
            <div ref={modalNode => this.modalNode = modalNode} className="itemselection_modalcontainer">
                <div  className="itemselection_modal">
                  <h5 className="modalTitle">Choose Items</h5>
                  <h4>{modalProduct.name}</h4>
                  <h6 className="text-muted">{modalProduct.description}</h6>
                  <div className="modal-accordian">
                      {
                          modalProduct.ingridients.map((item, index) => {
                            return <CustomizationOptions ingredient={item} key={index}/>
                          })
                      }
                  </div>
                  <div className="text-center">
                  <button onClick={this.handleCloseModal} type="button" className="btn btn-success modalButton mr-3">Cancel</button>
                  <button onClick={() => this.handleClick(selectedRestaurant._id,selectedMenu,modalProduct._id)} type="button" className="btn btn-primary modalButton"><FaShoppingBag/> Add to Cart</button>
                  </div>
                </div>
            </div>
            )
        }
        </div>
    )
  }
}

const mapStateToProps = (state) =>{
    return {
        modalOpen:state.openModal,
        modalProduct:state.modalProduct,
        selectedRestaurant:state.selectedRestaurant,
        selectedMenu:state.selectedMenu,
        radioBtnGroupName:state.radioBtnGroupName,
        ingredientsIdWithExceededLimit:state.ingredientsIdWithExceededLimit
    }
}

export default connect(mapStateToProps)(Modal)
