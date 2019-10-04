import React, { Component } from 'react';


export default class SelectMenu extends Component {
  render() {
    return (
        <div>
            <select className="custom-select">
                <option defaultValue>Best Match Menu</option>
                <option value="1">Delivery Cost</option>
                <option value="2">Delivery Time</option>
            </select>
        </div>
    )
  }
}
