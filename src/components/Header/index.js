import React from 'react';

import Link from 'components/Link';

import {
  ROUTE_HOME_PAGE,
  ROUTE_FAVORITES_PAGE,
} from 'pages/routes';

import logoSrc from 'assets/images/moving_toast.gif';

import './Header.css';


const Header = () => (
  <div className={'headerWrapper'}>
    <div className={'headerContentWrapper'}>
      <div className={'titleContainer'}>
        <Link dispatch={() => {}} route={ROUTE_HOME_PAGE}>
          {'breakfast gif'}
        </Link>
        <img src={logoSrc} className={'logo'} />
      </div>
      <div className={'linksContainer'}>
        <div className={'headerLink'}>
          {'Search'}
        </div>
        <div className={'headerLink'}>
          <Link
            dispatch={() => {}}
            route={ROUTE_FAVORITES_PAGE}
          >
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

export default Header;
