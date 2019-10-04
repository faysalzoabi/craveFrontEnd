import React, { Component } from 'react';
import './Search.css';

export class Search extends Component {

  
state = {
    searchItem:'',
    suggestionList:[]
}


handleChange = event => {
    const {items} = this.props;
    const value = event.target.value;
    if(value.length === 0){
        this.setState({suggestionList: [], searchItem:value})
    } else {
        const regex = new RegExp(`^${value}`, 'i')
        const suggestionList = items.sort().filter(v => regex.test(v));
        this.setState({suggestionList, searchItem:value});
    }
}

suggestionSelected(value){
    console.log('selected',value);
    this.setState({
    searchItem:value,
    suggestionList : []
    })
}

renderSuggestions () {
    const {suggestionList} = this.state;
    if(suggestionList === 0){
        return null;
    } 
    return(
    <ul>
        {suggestionList.map(item => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
    </ul>
    )
}

handleClick = event => {
    event.preventDefault();
}

render() {
    const {searchItem} = this.state;
return (
    <div className='form mt-4'>
    <form autocomplete="off" onSubmit={this.handleClick}>
        <div className="autocomplete mr-1" style={{width:'230px'}}>
            <input id="myInput" value={searchItem} onChange={this.handleChange} name="searchItem" type="text" placeholder="&#xf3c5; Emirate/City" style={{color:'red'}} className="fas py-3"/>
            {this.renderSuggestions()}
        </div>
    </form>
    </div>
)
}
}

export default Search
