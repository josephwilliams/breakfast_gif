import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED } from 'redux/actions/giphy.js';

import { extractGiphyState } from 'redux/reducers/giphy.js';

import loadingGif from 'assets/images/moving_breakfast.gif';

import makeAction from 'redux/utils.js';

import './Grid.css';


class Grid extends Component {
  // NOTE: componentWillMount is really for server-side, but is called on browser-side too, I believe. Either way, because we're not server-side rendering, componentDidMount would work the same.
  componentDidMount() {
    this.props.dispatch(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED));
  }

  render() {
    const {
      isLoadingList,
      listLoadError,
      // list,
    } = this.props;

    return (
      <div className={'gridWrapper'}>
        {isLoadingList || listLoadError
          ? (
            <img
              src={loadingGif}
              className={'loadingIcon'}
              alt={'loading...'}
            />
          )
          : (
            <div className={'gridContentWrapper'}>
              {'list'}
            </div>
          )
        }
      </div>
    );
  }
}

Grid.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoadingList: PropTypes.bool.isRequired,
  listLoadError: PropTypes.object,
  list: PropTypes.array,
};

const GridConnected = connect(
  (globalState) => ({
    isLoadingList: extractGiphyState(globalState).isLoadingList,
    listLoadError: extractGiphyState(globalState).listLoadError,
    list: extractGiphyState(globalState).list,
  })
)(Grid);

export default GridConnected;
