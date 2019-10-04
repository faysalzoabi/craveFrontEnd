import React, { Component } from 'react';
import Title from '../Title/Title';
import './Header.css';
import { connect } from 'react-redux';
import {openSearchCityModal} from '../../store/actions';
export class Header extends Component {

handleClick = () => {
  this.props.dispatch(openSearchCityModal())
}


render() {
    return (
      <div className="header">
        <div className="itemsposition">
            <Title/>
            <div className="itemposition__search">
              <button onClick={this.handleClick} className="itemposition_btn">
                Search you area
              </button>
            </div>
        </div>
      </div>
    )
  }
}

export default connect()(Header)
