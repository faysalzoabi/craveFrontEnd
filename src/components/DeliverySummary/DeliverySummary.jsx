
import './DeliverySummary.css';
import {storeTextAreaRequest} from '../../store/actions';
import { connect } from 'react-redux'
import React from 'react'

function DeliverySummary(props) {

    const {textAreaOrderRequest} = props
    function handleChange(event){
                let inputText = event.target.value
                props.dispatch(storeTextAreaRequest(inputText))
            }

    return (
        <div className="checkout__delivery">
            <div className="checkout__delivery__selectorcontainer">
                <select id="country" name="country">
                    <option value="australia">As soon as possible</option>
                    <option value="canada">Later</option>
                </select>
            </div>
            <div className="checkout__payment__textaracontainer">
                <textarea onChange={handleChange}  name="subject" value={textAreaOrderRequest} placeholder="Write your special request with the order.." style={{height:"130px"}}></textarea>
            </div>
        </div>
    )
}


export default connect()(DeliverySummary)
