import React from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash/get';

import './Card.css';


// TODO: add 'add to favorite' button UI to card, dispatching action.
const Card = ({ imageUrls, title }) => {
  const gifUrl = lodashGet(imageUrls, 'fixed_height_downsampled.url');

  return (
    <div className={'cardWrapper'}>
      <img
        src={gifUrl}
        alt={title}
        className={'gifCard'}
      />
    </div>
  );
}

Card.propTypes = {
  imageUrls: PropTypes.shape({
    data: PropTypes.shape({
      fixed_height_downsampled: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    })
  }),
  title: PropTypes.string.isRequired,
};

export default Card;
