import React from 'react';
import PropTypes from 'prop-types';

import { routeActions } from 'redux-simple-router';

import { PAGE_ROUTES } from 'pages/routes';

import './Link.css';


const Link = ({ children, dispatch, route }) => (
  <span
    className={'linkWrapper'}
    onClick={() => dispatch(routeActions.push(route))}
  >
    {children}
  </span>
);

Link.propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.oneOf(PAGE_ROUTES).isRequired,
  children: PropTypes.node.isRequired,
};

export default Link;
