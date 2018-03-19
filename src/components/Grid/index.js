import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED } from 'redux/actions/giphy.js';

import loadingGif from 'assets/images/moving_breakfast.gif';

import makeAction from 'redux/utils.js';

import './Grid.css';


// TODO: implement conditional UI based on isLoading data or not.
class Grid extends Component {
  // NOTE: componentWillMount is really for server-side, but is called on browser-side too, I believe. Either way, because we're not server-side rendering, componentDidMount would work the same.
  componentWillMount() {
    this.props.dispatch(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED));
  }

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

Grid.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const GridConnected = connect()(Grid);

export default GridConnected;
