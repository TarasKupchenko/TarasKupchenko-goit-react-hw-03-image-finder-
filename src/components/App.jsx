import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import css from './App.module.css';
import { fetchImagesApi } from './Api/Api';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    showBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages(searchQuery, page);
    }
  }

  fetchImages = async (searchQuery, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await fetchImagesApi(searchQuery, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        showBtn: page < Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = largeURL => {
    this.setState({
      largeImageURL: largeURL,
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      largeImageURL: '',
      showModal: false,
    });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, showBtn } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && showBtn && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
        {showModal && (
          <Modal
            onClose={this.handleCloseModal}
            largeImageURL={largeImageURL}
          />
        )}
      </div>
    );
  }
}
