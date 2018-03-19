import React from 'react';
import PropTypes from 'prop-types';

import lodashGet from 'lodash/get';

import Modal from 'react-modal';

import './GifModal.css';


// NOTE: 'customStyles' and 'setAppElement' from react-modal. See https://github.com/reactjs/react-modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : 'none',
    borderTop             : '10px solid #fbfc89',
    borderBottom          : '10px solid #fbfc89',
  }
};

Modal.setAppElement('#root');

const GifModal = ({ modalGifId, closeModal, selectedGifData }) => {
  // NOTE: if there is a selected 'modalGifId', modal is open. This approach could cause some contention, and admittedly is syntantically less clean than an 'isOpen' bool, but overall works a little better, as you only have to consider a single prop.

  const gifData = [
    {
      title: 'title',
      value: selectedGifData.title,
    },
    {
      title: 'user',
      value: selectedGifData.username,
    },
    {
      title: 'rating',
      value: selectedGifData.rating,
    },
  ];

  const gifUrl = lodashGet(selectedGifData, 'images.original.url');

  return (
    <Modal
      isOpen={!!modalGifId}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className={'modalContentWrapper'}>
        <img src={gifUrl} alt={selectedGifData.title} className={'modalGif'} />
        <div className={'modalInfoWrapper'}>
          {gifData.map((item, index) => (
            <div className={'modalInfoRow'} key={index}>
              <div className={'modalInfoRowTitle'}>
                {item.title + ': '}
              </div>
              <div className={'modalInfoRowValue'}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

GifModal.propTypes = {
  modalGifId: PropTypes.string,
  closeModal: PropTypes.func,
  selectedGifData: PropTypes.object,
};

GifModal.defaultProps = {
  selectedGifData: {},
};

export default GifModal;
