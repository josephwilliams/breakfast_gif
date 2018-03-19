import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import SearchInput from 'components/SearchInput';
import Link from 'components/Link';

import {
  ROUTE_HOME_PAGE,
  ROUTE_FAVORITES_PAGE,
} from 'pages/routes';

import { ACTION_LOAD_GIPHY_LIST_REQUESTED } from 'redux/actions/giphy.js';

import logoSrc from 'assets/images/moving_toast.gif';

import makeAction from 'redux/utils.js';

import './Header.css';


const Header = ({ dispatch }) => {
  // NOTE: this is not-so-elegant solution to reload trending gifs after search by clicked implied 'Home' link.
  const loadTrendingGiphys = () => (
    dispatch(makeAction(ACTION_LOAD_GIPHY_LIST_REQUESTED))
  );

  return (
    <div className={'headerWrapper'}>
      <div className={'headerContentWrapper'}>
        <Link route={ROUTE_HOME_PAGE}>
          <div className={'titleContainer'} onClick={loadTrendingGiphys}>
            {'breakfast gif'}
            <img src={logoSrc} className={'logo'} alt={'breakfast gif'} />
          </div>
        </Link>
        <div className={'linksContainer'}>
          <SearchInput />
          <div className={'headerLink'}>
            <Link route={ROUTE_FAVORITES_PAGE}>
              {'Favorites'}
            </Link>
          </div>
          <div className={'headerLink'}>
            <a
              href={'https://github.com/josephwilliams/breakfast_gif'}
              target={'_blank'}
              className={'linkContainer'}
            >
              {'Github'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const HeaderConnected = connect()(Header);

export default HeaderConnected;
