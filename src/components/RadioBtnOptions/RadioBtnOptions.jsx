import React, { Component } from 'react';
import { connect } from 'react-redux';


export class RadioBtnOptions extends Component {

    render() {
        const {item, ingredientId, groupNameTitle} = this.props;
        return (
            <div className="modalAccordItem">
                <label>
                    <input 
                    className="mr-1 modalAccordItem-input" 
                    type="radio" 
                    value={item.itemname}
                    checked={this.props.selectedRadioBtn === item.itemname}
                    onChange={(event) => this.props.handleChange(event, ingredientId,item, groupNameTitle)}
                    />
                    {item.itemname} 
                    <span style={{fontWeight:'600', color:'#ff8000'}}>{item.itemprice === 0 ? (null): (` (AED ${item.itemprice})`)}</span>
                </label>
            </div>
        )
    }
}


export default connect()(RadioBtnOptions)
