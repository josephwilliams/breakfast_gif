import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { PAGE_ROUTES } from 'pages/routes';

import './Link.css';


const PageLink = ({ children, route }) => (
  <Link to={route}>
    <span className={'linkWrapper'}>
      {children}
    </span>
  </Link>
);

PageLink.propTypes = {
  route: PropTypes.oneOf(PAGE_ROUTES).isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLink;
