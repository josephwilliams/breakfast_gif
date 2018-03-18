import React from 'react';

import logoSrc from 'assets/images/moving_toast.gif';

import './Header.css';


const Header = () => (
  <div className={'headerWrapper'}>
    <div className={'headerContentWrapper'}>
      <div className={'titleContainer'}>
        {'breakfast gif'}
      </div>
      <img src={logoSrc} className={'logo'} />
    </div>
  </div>
);

export default Header;
