import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import loadingGif from 'assets/images/moving_breakfast.gif';

import './Grid.css';


// TODO: implement conditional UI based on isLoading data or not.
class Grid extends Component {
  render() {
    return (
      <div className={'gridWrapper'}>
        <img
          src={loadingGif}
          className={'loadingIcon'}
          alt={'loading...'}
        />
        <div className={'gridContentWrapper'}>
        </div>
      </div>
    );
  }
}

export default Grid;
