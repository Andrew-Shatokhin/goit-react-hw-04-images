import {useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export function Items({ items }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { webformatURL, tags, largeImageURL} = items;
  return (
    <Item key={items.id}>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />

      {showModal && (
        <Modal
          onClose={toggleModal}
          imageUrl={largeImageURL}
          imageTags={tags}
        />
      )}
    </Item>
  );
}

Items.propTypes = {
  items: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

