import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({onClose,imageUrl,imageTags}) {

  useEffect(() => {

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
      }
  })


  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>
          <img src={imageUrl} alt={imageTags} />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );

}

Modal.propTypes = {
  imageTags: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};



