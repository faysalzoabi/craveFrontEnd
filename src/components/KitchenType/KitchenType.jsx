import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {fetchSelectedCusinie} from '../../store/actions';
import { connect } from 'react-redux';
import './KitchenType.css';

const list = [
    { name: 'Select all'},
    { name: 'Mexican' },
    { name: 'Indian' },
    { name: 'Chinese' },
    { name: 'Middle Eastern' },
    { name: 'Japnese' },
    { name: 'Korean' },
    { name: 'Thai' },
    { name: 'Indonesian' },
    { name: 'Vietnamese' },
    { name: 'Sea Food' },
    { name: 'Fast Food' },
    { name: 'Lebanese' },
    { name: 'Mediterranean' },
    { name: 'Arabian' },
    { name: 'North Indian' },
    { name: 'Mughlai' },
    { name: 'Italian' },
    { name: 'American' },
  ];

  // One item component
  // selected prop will be passed
  const MenuItem = ({text, selected}) => {
    return <div
      className={`menu-item ${selected ? 'active' : ''}`}
      >{text}</div>;
  };

  // All items component
  // Important! add unique key
  export const Menu = (list, selected) =>
    list.map(el => {
      const {name} = el;
      return <MenuItem text={name} key={name} selected={selected} />;
    });

  const Arrow = ({ text, className }) => {
    return (
      <div
        className={className}
      >{text}</div>
    );
  };

  const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
  const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
  const selected = 'item1';
class KitchenType extends Component {
    constructor(props) {
        super(props);
        // call it again if items count changes
        this.menuItems = Menu(list, selected);
      }

      state = {
        selected
      };

      onSelect = key => {
          console.log('key',key)
        this.setState({ selected: key }, () => {
            this.props.dispatch(fetchSelectedCusinie(this.state.selected))
        });
      }

      render() {
        const { selected } = this.state;
        // Create menu from items
        const menu = this.menuItems;
        return (
          <div className="App">
            <ScrollMenu
              data={menu}
              arrowLeft={ArrowLeft}
              arrowRight={ArrowRight}
              selected={selected}
              onSelect={this.onSelect}
            />
          </div>
        );
      }
}

export default connect()(KitchenType)
