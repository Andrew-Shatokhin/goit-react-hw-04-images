import React, { Component } from 'react';
import { Modal } from '../Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class Items extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.items;
    return (
      <Item>
        <Image src={webformatURL} alt={tags} onClick={this.toggleModal} />

        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            imageUrl={largeImageURL}
            imageTags={tags}
          />)}
      </Item>
    );
  }
}

Items.propTypes = {
  items: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
