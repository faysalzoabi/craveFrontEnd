import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { ClimbingBoxLoader } from 'react-spinners';
// Another way to import
import './Spinner.css';

 
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
 
class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <ClimbingBoxLoader
          css={override}
          sizeUnit={"px"}
          size={10}
          color={'#36D7B7'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default AwesomeComponent