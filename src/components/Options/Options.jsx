import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Options extends Component {
    state={
        isChecked : false
    }

    toggleCheckBox = () => {
        const {item, ingredientId, groupNameTitle} = this.props
        this.setState({isChecked:!this.state.isChecked}, () => {

            this.props.handleCheckBoxSelection(ingredientId, item, groupNameTitle, this.state.isChecked)
        })
    }
    render() {
        const {item, ingredientId, groupNameTitle} = this.props
        return (
            <div className="modalAccordItem">
                <label className="checkbox-inline">
                    <input 
                        // onChange={(event) => this.props.handleCheckBoxSelection(event, ingredientId, item, groupNameTitle)} 
                        onChange={() => this.toggleCheckBox(ingredientId, item, groupNameTitle)}
                        className="mr-1 modalAccordItem-input" 
                        type="checkbox" 
                        checked={this.state.isChecked}
                        value={item.itemname}
                        />
                        {item.itemname} 
                        <span style={{fontWeight:'600', color:'#ff8000'}}>{item.itemprice === 0 ? (null): (` (AED ${item.itemprice})`)}</span>
                </label>
            </div>
        )
    }
}

export default connect()(Options)
