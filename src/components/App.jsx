//import React, { useState, useEffect } from 'react';
//import Searchbar from './Searchbar/Searchbar';
//import ImageGallery from './ImageGallery/ImageGallery';
//import Button from './Button/Button';
//import Loader from './Loader/Loader';
//import Modal from './Modal/Modal';
//import css from './App.module.css';

//export const App = () => {
//  const [searchQuery, setSearchQuery] = useState('');
//  const [images, setImages] = useState([]);
//  const [page, setPage] = useState(1);
//  const [isLoading, setIsLoading] = useState(false);
//  const [showModal, setShowModal] = useState(false);
//  const [largeImageURL, setLargeImageURL] = useState('');

//  useEffect(() => {
//    if (!searchQuery) return;

//    const fetchImages = async () => {
//      try {
//        setIsLoading(true);

//        const response = await fetch(
//          `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=40756450-2b62d5efbb9c5d98f0ec642a2&image_type=photo&orientation=horizontal&per_page=12`
//        );
//        const data = await response.json();

//        setImages(prevImages => [...prevImages, ...data.hits]);
//      } catch (error) {
//        console.error('Error fetching images:', error);
//      } finally {
//        setIsLoading(false);
//      }
//    };

//    fetchImages();
//  }, [searchQuery, page]);

//  const handleSearchSubmit = query => {
//    setSearchQuery(query);
//    setPage(1);
//    setImages([]);
//  };

//  const handleLoadMoreClick = () => {
//    setPage(prevPage => prevPage + 1);
//  };

//  const handleImageClick = largeURL => {
//    setLargeImageURL(largeURL);
//    setShowModal(true);
//  };

//  const handleCloseModal = () => {
//    setLargeImageURL('');
//    setShowModal(false);
//  };

//  return (
//    <div className={css.app}>
//      <Searchbar onSubmit={handleSearchSubmit} />
//      {images.length > 0 && (
//        <ImageGallery images={images} onImageClick={handleImageClick} />
//      )}
//      {isLoading && <Loader />}
//      {images.length > 0 && !isLoading && (
//        <Button onClick={handleLoadMoreClick} />
//      )}
//      {showModal && (
//        <Modal onClose={handleCloseModal} largeImageURL={largeImageURL} />
//      )}
//    </div>
//  );
//};

import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      images: [],
      page: 1,
      isLoading: false,
      showModal: false,
      largeImageURL: '',
    };
  }

  componentDidMount() {
    const { searchQuery, page } = this.state;
    this.fetchImages(searchQuery, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages(searchQuery, page);
    }
  }

  fetchImages = async (searchQuery, page) => {
    if (!searchQuery) return;

    try {
      this.setState({ isLoading: true });

      const response = await fetch(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=40756450-2b62d5efbb9c5d98f0ec642a2&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
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
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
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
