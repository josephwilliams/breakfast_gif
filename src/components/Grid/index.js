import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED } from 'redux/actions/giphy.js';

import { extractGiphyState } from 'redux/reducers/giphy.js';

import loadingGif from 'assets/images/moving_breakfast.gif';

import makeAction from 'redux/utils.js';

import './Grid.css';


class Grid extends Component {
  componentDidMount() {
    this.props.dispatch(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED));
  }

  shouldComponentUpdate(nextProps) {
    console.log('>> shouldComponentUpdate', this.props === nextProps);
    return this.props !== nextProps;
  }

  componentWillReceiveProps(nextProps) {
    console.log('>>>>>>>>>>>> componentWillReceiveProps PROPS', nextProps);
  }

  render() {
    const {
      isLoadingList,
      listLoadError,
      list,
    } = this.props;

    console.log(
      '>> isLoadingList', this.props.isLoadingList,
      '>> list', list,
      '>> error', listLoadError
    );

    // TODO: Create error UI. For now, just showing loading UI if loading, error, or empty list.
    const shouldShowLoadingUI = (
      isLoadingList
      || listLoadError
      || (list && Array.isArray(list) && list.length === 0)
    );

    return (
      <div className={'gridWrapper'}>
        {shouldShowLoadingUI
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
  listLoadError: PropTypes.bool.isRequired,
  list: PropTypes.array,
};

const GridConnected = connect(
  (globalState) => {
    console.log('>> globalState', globalState, globalState.giphyReducer);
    return {
      isLoadingList: extractGiphyState(globalState).isLoadingList,
      listLoadError: !!extractGiphyState(globalState).listLoadError,
      list: extractGiphyState(globalState).list,
    };
  }
)(Grid);


export default GridConnected;
