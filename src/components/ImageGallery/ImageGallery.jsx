import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => {
  return (
    <div>
      <ul className={css.gallery}>
        {images.map(image => (
          <ImageGalleryItem key={image.id} {...image} />
        ))}
      </ul>
    </div>
  );
};
