import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  handleImageClick = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { id, webformatURL, largeImageURL } = this.props;
    const { isModalOpen } = this.state;

    return (
      <div>
        <li
          key={id}
          className={css.gallery_item}
          onClick={this.handleImageClick}
        >
          <img
            src={webformatURL}
            alt=""
            className={css.gallery_item_image}
            data-source={largeImageURL}
          />
        </li>
        {isModalOpen && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}
