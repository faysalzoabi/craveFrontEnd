// import React from 'react'
import './CustomizationOptions.css';
import Options from '../Options/Options';
import RadioBtnOptions from '../RadioBtnOptions/RadioBtnOptions';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton
} from 'react-accessible-accordion';
import {addIngredients, addIngredientsOfCheckBox, saveRadioBtnGroupName, deactivateRedTickMark, 
        removeIngredientOfCheckBox, addIngredientIdExceedLimit, removeIngredientIdExceedLimit} from '../../store/actions';
        
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { MdError } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';


export class CustomizationOptions extends Component {
  state = {
    selectedName:'',
    radioBtnCount:0
  }

  handleChange = (event, ingredientId,item, groupNameTitle) => {
    const{notSelectedGroupTitleArray, radioBtnGroupName} = this.props;
    
    // console.log('current state', this.state.selectedName);
    this.setState({selectedName:event.target.value});
    this.props.dispatch(addIngredients(ingredientId,item._id));

    //if the name title of the ingredient group is not in the array then add it to it
    if(!radioBtnGroupName.includes(groupNameTitle)){
      this.props.dispatch(saveRadioBtnGroupName(groupNameTitle));
    }

    //if the name title of the group of radio buttons exist in the array then remove it out of array
    if(notSelectedGroupTitleArray.includes(groupNameTitle)) {
      this.props.dispatch(deactivateRedTickMark(groupNameTitle))
    }
    
}

handleCheckBoxSelection = (ingredientId, item, groupNameTitle, isChecked) => {

  const{ingredient, ingredientsIdWithExceededLimit} = this.props;
  
  //adding and removing the checkbox items to the array once clicked
    if(isChecked){
      this.props.dispatch(addIngredientsOfCheckBox(ingredientId,item._id));
    } else {
      this.props.dispatch(removeIngredientOfCheckBox(ingredientId,item._id));
      //if checkbox unchecked then check if the ingredient ID in the array that exceed the limit
      if(ingredientsIdWithExceededLimit.includes(ingredientId)) {
        this.props.dispatch(removeIngredientIdExceedLimit(ingredient._id))
      }
    }
    
}

componentDidUpdate(){
  const{ingredient, checkBoxIngredients, ingredientsIdWithExceededLimit} = this.props;

  if(checkBoxIngredients.filter(element => element._id === ingredient._id).length > ingredient.maxlimit && !ingredientsIdWithExceededLimit.includes(ingredient._id)){
    this.props.dispatch(addIngredientIdExceedLimit(ingredient._id))
  }
}
  render() {
    const {ingredient, notSelectedGroupTitleArray, checkBoxIngredients, ingredientsIdWithExceededLimit, radioBtnGroupName} = this.props;
    return (
      <Accordion className="modalaccord" allowMultipleExpanded="true" allowZeroExpanded="true">
    <AccordionItem className="modalaccordcontainer">
        <AccordionItemHeading className="modalaccordHead">
            <AccordionItemButton>
              <span>
              {
                  ingredient.type === 1 ? (
                    notSelectedGroupTitleArray.includes(ingredient.name) ? (<MdError className="redTickMarkIcon"/>) : 
                    ((radioBtnGroupName.length > 0 && radioBtnGroupName.includes(ingredient.name)) ? (
                      <FaCheckCircle className="greenTickMarkIcon"/>) :
                        (null))
                  ) : (
                    //if number of checkedboxes greater than allowed maxlimit then flag red alert
                    checkBoxIngredients.filter(element => element._id === ingredient._id).length === ingredient.maxlimit ? (
                      <FaCheckCircle className="greenTickMarkIcon"/>
                  ) : (
                    checkBoxIngredients.filter(element => element._id === ingredient._id).length > ingredient.maxlimit ? (
                      <MdError className="redTickMarkIcon"/>
                    ) : (
                      null
                    )
                  ) 
                )
              } 
              </span>
              {`${ingredient.name}:${ingredient.type}`}<span className={notSelectedGroupTitleArray.includes(ingredient.name) || ingredientsIdWithExceededLimit.includes(ingredient._id) ? ('red') : 
              ('black')}><small>{ingredient.maxlimit === 1 ? (' (Choose Only 1 item)') : (` (Choose Maximum ${ingredient.maxlimit} items from the list)`)}</small></span>

            </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className="modalAccordPanel">
          {     
            //if its optional or if its required and and the limit more than 1
            ingredient.type === 0  ? (
              ingredient.items.map((option, index) => {
              return( 
                        <Options key={index} ingredientId={ingredient._id} item={option} handleCheckBoxSelection={this.handleCheckBoxSelection} groupNameTitle={ingredient.name}/>
                    )
              })
            ) : (
            // if its required and maxlimit == 1
            ingredient.items.map((option, index) => {
              return( 
                        <RadioBtnOptions key={index} ingredientId={ingredient._id} item={option} handleChange={this.handleChange} selectedRadioBtn={this.state.selectedName} groupNameTitle={ingredient.name}/>
                    )
              })

            )
              
          }
        </AccordionItemPanel>
    </AccordionItem>
  </Accordion>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
      
    notSelectedGroupTitleArray:state.notSelectedGroupTitleArray,
    selectedGroupTitlesArray:state.selectedGroupTitlesArray,
    radioBtnGroupName:state.radioBtnGroupName,
    redTickMark:state.redTickMark,
    greenTickMark:state.greenTickMark,
    checkBoxIngredients:state.checkBoxIngredients,
    ingredientsIdWithExceededLimit:state.ingredientsIdWithExceededLimit
  }
}
export default connect(mapStateToProps)(CustomizationOptions)

