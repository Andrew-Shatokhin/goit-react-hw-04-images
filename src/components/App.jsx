import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import Searchbar from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';

export default class App extends Component {
  state = {
    imageSearch: '',
  };

  handleSubmit = imageSearch => {
    this.setState({ imageSearch });
  };


  render() {
    const { imageSearch, modalImage, showModal } = this.state;

    return (
      <Layout>
        <Searchbar onSearch={this.handleSubmit} />
        <ImageGallery value={imageSearch} />
        {showModal && modalImage && (
          <Modal onClose={this.toggleModal} modalImage={this.modalImage} />
        )}

        <GlobalStyle />
      </Layout>
    );
  }
}
