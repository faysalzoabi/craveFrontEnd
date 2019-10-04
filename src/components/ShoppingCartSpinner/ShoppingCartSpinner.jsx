import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { ClipLoader } from 'react-spinners';
// Another way to import


 
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
      <div className='sweet-loading2'>
        <ClipLoader
          css={override}
          sizeUnit={"px"}
          size={37}
          color={'#D0021B'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default AwesomeComponent