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
  }
};

Modal.setAppElement('#root');

const GifModal = ({ modalGifId, closeModal, selectedGifData = {} }) => {
  // NOTE: if there is a selected 'modalGifId', modal is open. This approach could cause some contention, and admittedly is syntantically less clean than an 'isOpen' bool, but overall works a little better, as you only have to consider a single prop.

  const gifData = [
    {
      title: 'title',
      value: selectedGifData.title,
    },
    {
      title: 'rating',
      value: selectedGifData.rating,
    },
    {
      title: 'user',
      value: selectedGifData.username,
    },
  ];

  const gifUrl = lodashGet(selectedGifData, 'original.url');
  console.log('>> selectedGifData', selectedGifData);

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

export default GifModal;
