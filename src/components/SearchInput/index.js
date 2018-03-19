import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ACTION_LOAD_GIPHY_SEARCH_RESULTS_LIST_REQUESTED } from 'redux/actions/giphy.js';

import makeAction from 'redux/utils.js';

import './SearchInput.css';


class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: ''
    };
  }

  updateSearchInputText = (event) => {
    const updatedSearchInputText = event.target.value;
    // NOTE: ensure that search input value is at least one character (and exists).
    if (event.target.value) {
      this.setState({ searchInputText: updatedSearchInputText });
    }
  }

  handleClickSearch = () => {
    this.props.dispatch(makeAction(ACTION_LOAD_GIPHY_SEARCH_RESULTS_LIST_REQUESTED, {
      searchInput: this.state.searchInputText,
    }));
  }

  render() {
    return (
      <div className={'searchInputWrapper'}>
        <input
          type={'text'}
          onChange={this.updateSearchInputText}
          className={'searchInput'}
        />
        <div className={'searchText'} onClick={this.handleClickSearch}>
          {'Search'}
        </div>
      </div>
    );
  }
}

SearchInput.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const SearchInputConnected = connect()(SearchInput);

export default SearchInputConnected;
