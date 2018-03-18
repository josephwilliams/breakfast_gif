import React from 'react';

import Header from 'components/Header';

import './Page.css';


const Page = ({ children }) => (
  <div>
    <Header />
    <div className={'pageContainer'}>
      {children}
    </div>
  </div>
);

export default Page;
