import React, { Component } from 'react'
import './Menus.css';
import MenuAccordion from '../MenuAccordion/MenuAccordion';
import {connect} from 'react-redux';
import {
  Accordion
} from 'react-accessible-accordion';
import  SearchMenu from '../SearchMenu/SearchMenu';

export class Menus extends Component {
  render() {
    let expandList = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
    const{menuGroups} = this.props;
  
    return (
      <div className='menu'>
        <SearchMenu/>
        <Accordion className="accord" allowMultipleExpanded="true" allowZeroExpanded="true" preExpanded={expandList}>
        {
              menuGroups.map((item, index) => {
            return <MenuAccordion key={index} menuGroup={item} track={index + 1} no={index}/>
          })
        }
        </Accordion>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menuGroups:state.menuGroups,
    menuSearchedKeyword:state.menuSearchedKeyword
  }
}

export default connect(mapStateToProps)(Menus)
