import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CitySearchModal.css';
import {closeSearchCityModal} from '../../store/actions';
import CityList from '../CityList/CityList';
import SearchCity from '../SearchCity/SearchCity';

export class CitySearchModal extends Component {

    state = {
        cities:['Abu Dhabi','Dubai','Sharjah (Coming Soon)','Ajman (Coming Soon)','Al Ain (Coming Soon)','Ras Al Khaima (Coming Soon)']
    }

handleCloseModal = () => {
    this.props.dispatch(closeSearchCityModal());
    
}

componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    window.addEventListener('click', this.handleOutsideClick, false);
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
    if(e.target === this.node) {
        this.handleCloseModal();
    }
}

render() {
    const {searchCityModal, areas, areaSearchedkeyword} = this.props;
    //filter the areas during the search
    let filteredArea = areas.filter(area => area.name.toLowerCase().indexOf(areaSearchedkeyword.toLowerCase()) !== -1)
    return (
        <>
                {searchCityModal ? (
                    <div ref={node => this.node = node} className="citySearchModalContainer">
                        <div className="cityScearchModalBody">
                        <div className="closeBtnContainer">
                            <span onClick={this.handleCloseModal} className="citySearchCloseBtn" title="Close Modal">&times;</span>
                        </div>
                        
                            <SearchCity/>
                            <div className="citySearchModalContents">
                                {
                                    this.state.cities.map((city, index) => {
                                        return <CityList key={index} city={city} areas={filteredArea} handleCloseModal={this.handleCloseModal}/>
                                    })
                                }
                            </div>
                        </div>
                        
                    </div>
                ) : (
                    null
                )}
        </>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        searchCityModal:state.searchCityModal,
        areas:state.areas,
        areaSearchedkeyword:state.areaSearchedkeyword
    }
}

export default connect(mapStateToProps)(CitySearchModal)
