import PropTypes from "prop-types"
import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import { connect } from 'react-redux'
import './GooglePlaceAutoComplete.css';
const API_KEY = "AIzaSyCUFMLiNjxnGg185XQDuPaTD7zRHIiOXUY";

class GooglePlaceAutoComplete extends React.Component {
  
state = {
  search: "",
  value: "",
  coordinates:[]
}

handleInputChange(e) {
  this.setState({search: e.target.value, value: e.target.value})
}

handleSelectSuggest(suggest) {
  let lat,lng;
  if(suggest.geometry){
      lat = suggest.geometry.location.lat();
      lng = suggest.geometry.location.lng();
  }
  this.setState({search: "", value: suggest.formatted_address, coordinates:[...this.state.coordinates,lat,lng]})
}

render() {
    return (
      <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <div className="googleauto__container">
              <ReactGooglePlacesSuggest
                // autocompletionRequest={{input: search}}
                // autocompletionRequest={{input: this.props.secondAddress}}
                autocompletionRequest={{input: this.props.search}}
                googleMaps={googleMaps}
                // onSelectSuggest={this.handleSelectSuggest.bind(this)}
                onSelectSuggest={this.props.handleSelectSuggest}
              >
                <input
                  type="text"
                  name="secondAddress"
                //   value={value}
                  value={this.props.secondAddress}
                  placeholder="Enter the location address..."
                //   onChange={this.handleInputChange.bind(this)}
                  onChange={this.props.handleChange}
                  onBlur={this.props.handleBlur}
                  style={{
                    borderColor:
                    this.props.errors && this.props.touch && "red"
                  }}
                  required
                />
                {this.props.errors && this.props.touch && (
                    <div style={{ color: "red" }}>{this.props.errors}</div>
                    )}
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
    )
  }
}

GooglePlaceAutoComplete.propTypes = {
  googleMaps: PropTypes.object,
}

export default connect()(GooglePlaceAutoComplete)