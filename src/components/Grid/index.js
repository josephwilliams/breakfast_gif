import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from 'components/Card';

import { ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED } from 'redux/actions/giphy.js';

import {
  extractGiphyStateIsLoadingList,
  extractGiphyStateList,
  extractGiphyStateListLoadError,
} from 'redux/reducers/giphy.js';

import loadingGif from 'assets/images/moving_breakfast.gif';

import makeAction from 'redux/utils.js';

import './Grid.css';


class Grid extends Component {
  componentDidMount() {
    this.props.dispatch(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED));
  }

  render() {
    const {
      isLoadingList,
      listLoadError,
      list,
    } = this.props;

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
              {list.map((listItem) => {
                const gifTitle = listItem.title;
                const gifUrls = listItem.images;
                return (
                  <Card imageUrls={gifUrls} title={gifTitle} key={listItem.id}/>
                );
              })}
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
    return {
      isLoadingList: extractGiphyStateIsLoadingList(globalState),
      listLoadError: !!extractGiphyStateListLoadError(globalState),
      list: extractGiphyStateList(globalState),
    };
  }
)(Grid);


export default GridConnected;
