import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-modal';

import './GifModal.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const GifModal = ({ modalGifId, closeModal, selectedGifData }) => {
  // NOTE: if there is a selected 'modalGifId', modal is open. This approach could cause some contention, and admittedly is syntantically less clean than an 'isOpen' bool, but overall works a little better, as you only have to consider a single prop.
  return (
    <Modal
      isOpen={!!modalGifId}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {'modal!!!'}
    </Modal>
  );
};

GifModal.propTypes = {
  modalGifId: PropTypes.string,
  closeModal: PropTypes.func,
  selectedGifData: PropTypes.object,
};

export default GifModal;
