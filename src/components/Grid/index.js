import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from 'components/Card';
import GifModal from 'components/GifModal';

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
  constructor(props) {
    super(props);
    // NOTE: handling modal state in Grid because modal can't exist without Grid (as Gif is clicked on from within in), and because, imo, it shouldn't warrant use of redux state if it can be handled within a component.
    // NOTE: handling 'isOpen' via tracking if a gif Id is selected, saving me the hassle of having *both* 'isOpen' and 'modalGifId'.
    this.state = {
      modalGifId: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(makeAction(ACTION_LOAD_TRENDING_GIPHY_LIST_REQUESTED));
  }

  openModal = (gifId) => {
    this.setState({ modalGifId: gifId });
  }

  closeModal = () => {
    this.setState({ modalGifId: null });
  }

  render() {
    const {
      modalGifId,
    } = this.state;

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

    const selectedGifData = (
      list && Array.isArray(list) && list.filter((id) => id === modalGifId)
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
              <GifModal
                closeModal={this.closeModal}
                modalGifId={this.state.modalGifId}
                gifData={selectedGifData}
              />
              {list.map((listItem) => {
                const gifTitle = listItem.title;
                const gifUrls = listItem.images;
                const gifId = listItem.id;
                return (
                  <div onClick={() => this.openModal(gifId)} key={gifId}>
                    <Card
                      imageUrls={gifUrls}
                      title={gifTitle}
                      />
                  </div>
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
