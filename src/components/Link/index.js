import React from 'react';
import PropTypes from 'prop-types';

import { routeActions } from 'redux-simple-router';

import { PAGE_ROUTES } from 'pages/routes';

import './Links.css';


const Link = ({ children, dispatch, route }) => (
  <span
    className={'linkWrapper'}
    onClick={() => dispatch(routeActions.push(route))}
  >
    {children}
  </span>
);

Link.displayName = 'Link';

Link.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.oneOf(PAGE_ROUTES).isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
